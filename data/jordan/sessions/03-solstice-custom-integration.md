# Condition 3 — Solstice Manufacturing (homegrown ticketing integration)

**Jordan:** got a weird one. solstice manufacturing wants to feed data into atlas from their own internal ticketing tool, not something off the shelf. tom from sales is asking if we can even do this, there's a renewal conversation tied to it apparently

**AI:** Do we have any documentation on ingesting from non-standard or custom systems, or is this always handled case by case?

**Jordan:** there's something in the integration docs about a "generic webhook connector" but I don't know how current that page is

**AI:** Can you paste what it says?

**Jordan:** "The generic webhook connector accepts POST requests matching the Atlas ingestion schema and can be used for systems without a native Atlas connector. Contact engineering for setup assistance." that's basically the whole section, no timestamp on it either

**AI:** Pretty thin. Is there anything in Slack that might give more context on whether it's actually used much?

**Jordan:** let me search around... found a thread from january, but it's not really about this directly, someone was asking about webhook rate limits for a totally different reason, billing exports I think

**AI:** Does anything in that thread touch on whether the generic connector itself is still actively maintained?

**Jordan:** kind of, tangentially. dev-priti replies with something like "isn't that the old webhook thing, not sure anyone's touched it in a while" and then dev-alina reacts with a thumbs up emoji, no actual comment. then it just moves on to something else

**AI:** So not really a resolved answer either way, just a passing comment plus a reaction with no elaboration.

**Jordan:** yeah. let me see if there's anything more direct, maybe a past ticket

**Jordan:** ok there's one from last year, different customer, but I'm not sure how applicable it actually is. let me pull it up

**Jordan:** so this one's a customer who wanted a one-time bulk import of historical tickets, not ongoing sync. they ended up getting a CSV export pushed through the standard ingestion API via a one-off script. ticket's marked resolved, not much detail beyond that

**AI:** That's a different shape of problem though — a one-time historical import versus what Solstice is asking for, which sounds like it'd need to be ongoing. Might not transfer directly.

**Jordan:** yeah that's what I was thinking too

**AI:** Given the CSV-plus-script approach at least demonstrates the ingestion API can accept externally-sourced data in some form, it might still be worth mentioning to Solstice as a possible direction, even if the ongoing-sync part would need to be solved separately.

**Jordan:** eh, I don't think I want to bring that up to them yet, it's not really the same problem and I don't want to set an expectation based on something that doesn't actually match what they're asking for

**AI:** Fair, that makes sense — better to not anchor them on an approach that might not hold up once someone actually looks at feasibility.

**Jordan:** yeah. ok given how thin all this is, I think I just need to ask someone directly rather than piecing it together from old threads

**AI:** Makes sense. Want a draft message to send to engineering, or do you want to write that one yourself since it's a fairly open-ended ask?

**Jordan:** I'll write that one. but can you draft something for tom in the meantime since he's going to want an update today regardless

**AI:** Draft for Tom:

"Hey Tom — early read on Solstice: this isn't a standard integration, so it'll need some engineering input before we can commit to an approach or timeline. I'm checking what's actually available and current on our side before saying anything definitive to Solstice. Should have a clearer answer in a few days — can you hold off giving them a hard commitment until then?"

**Jordan:** yeah that's fine, send it

**Jordan:** [message to #atlas-eng] "anyone know offhand if the generic webhook connector is something we still point new customers to, or is that basically deprecated at this point? trying to scope something for solstice manufacturing"

**AI:** Want me to hold off preparing anything technical for Solstice's contact until you hear back, or start roughing out what a generic-webhook-based approach would even look like in parallel, in case the answer comes back "yes, still fine"?

**Jordan:** let's just wait, don't want to build something around an answer I don't have yet
