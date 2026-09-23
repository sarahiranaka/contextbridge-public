# Condition 1 — Vantage Supply Co. (Zendesk onboarding)

**Jordan:** ok pulling up vantage supply co onboarding. zendesk connector, standard config per the runbook. let's get the field mapping done today if possible, dana (their IT contact) wants to test by thursday

**AI:** Got it. Do you have their requested field list handy, or should I pull the standard mapping from the runbook first and you can diff it against what they asked for?

**Jordan:** standard mapping first, yeah

**AI:** Standard Zendesk → Atlas mapping per the runbook:
- ticket.subject → feedback.title
- ticket.description → feedback.body
- ticket.tags → feedback.tags
- ticket.custom_field:csat → feedback.sentiment_score (optional)
- ticket.requester.email → feedback.customer_email

That's the default. Anything Vantage asked for outside this?

**Jordan:** yeah they want their internal "product area" field mapped too, it's a custom dropdown field they added

**AI:** Do you know the field ID for that in their Zendesk instance? Custom fields are usually referenced by numeric ID, not the display name, when you set up the mapping.

**Jordan:** no idea, dana just said "product area" in the email. let me check the sandbox

**Jordan:** ok found it, looks like field id 360019283412, dropdown with values like "Fulfillment", "Billing", "Returns" etc

**AI:** That should map fine as a tag-style field rather than a scalar — Atlas doesn't have a generic "category" field in the default schema, so unless you want to shove it into tags, it'd need to go into feedback.tags as a prefixed value, e.g. `product_area:fulfillment`, or you'd need a schema exception.

**Jordan:** let's just do tags for now, don't want to file a schema exception for one customer

**AI:** Sounds reasonable. Here's the mapping config draft:

```
custom_field_360019283412:
  target: tags
  transform: lowercase_underscore
  prefix: "product_area:"
```

Want me to draft the sandbox test payload so you can verify before pushing to their instance?

**Jordan:** yeah do that

**AI:** [draft payload attached — 3 sample tickets covering Fulfillment, Billing, and a blank product_area value]

Note the third sample has an empty product_area — wanted to check how you want blanks handled, since not every Vantage ticket will have that field filled in.

**Jordan:** oh good catch, let's just skip the tag entirely if it's blank, don't want "product_area:" floating around with nothing after it

**AI:** Updated the transform to skip the tag when the field is empty. Running the sandbox test now.

**AI:** Two of the three came through fine — Fulfillment and Billing tagged correctly. The blank one came through without the product_area tag as expected, but its other tags are also missing, the ones that should've carried over from the original ticket.

**Jordan:** wait what

**AI:** My first guess — the prefix concatenation might be choking on an empty string and throwing off the whole tags field somehow, like a type mismatch when it tries to prepend "product_area:" to nothing. Let me try forcing the transform to cast to string explicitly before the prefix step.

**Jordan:** ok try it

**AI:** Tried that, same result — still losing the original tags on the blank case. So it's probably not a casting issue.

**Jordan:** ok what else

**AI:** Could be an ordering issue — if the blank-check happens after the tags array is already being rebuilt from scratch rather than appended to, that'd explain it regardless of the casting. Let me look at how the transform's structured rather than guessing again.

**Jordan:** yeah honestly can you just paste me the actual transform config, I want to look at it myself

**AI:** [pastes transform config]

```
transform:
  - field: custom_field_360019283412
    if_empty: {action: set_field, target: tags, value: []}
    else: {action: append_field, target: tags, value: "product_area:{value}"}
```

**Jordan:** ...there it is. the if_empty branch is doing `set_field` to an empty array, not "do nothing." that overwrites tags instead of leaving it alone

**AI:** You're right, I read that as a no-op branch when I first wrote it but it's explicitly setting the field, not skipping the step. Fixing it to just skip the whole block when the value's empty instead of setting anything.

**Jordan:** yeah do that

**AI:** Updated:

```
transform:
  - field: custom_field_360019283412
    if_empty: {action: noop}
    else: {action: append_field, target: tags, value: "product_area:{value}"}
```

Re-running the same three samples.

**AI:** All three came through correctly this time, existing tags preserved on all of them.

**Jordan:** ok cool. gonna step away from this for a sec, denholm's onboarding guy is pinging me about their go-live date, brb

**Jordan:** ok back. so are we good to push this to their real zendesk instance or do we want dana to sign off on the mapping first

**AI:** Given it's a custom field mapping specific to their workflow, probably worth a quick confirmation from Dana before it goes live, even if the sandbox test passed now.

**Jordan:** yeah true. let me draft something to send her

**AI:** Draft:

"Hi Dana — quick check before we finalize: we're mapping your 'Product Area' field into Atlas as a tag (e.g. product_area:fulfillment). For tickets where that field is left blank, we'll just omit the tag rather than adding an empty one. Let me know if that works or if you'd rather we handle blanks differently. Aiming to have this live by Wednesday so you've got a day to test before Thursday."

**Jordan:** good, sending that
