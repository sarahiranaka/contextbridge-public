# Condition 2 — Whitfield Logistics (Salesforce escalation)

**Jordan:** ok this whitfield thing. priya's already pinged me twice about it this morning, they're not happy

**AI:** What's the reported symptom?

**Jordan:** their admin ron says feedback records are "missing" from some of their reports, but he wasn't super specific about what's missing or since when

**AI:** Do we have ingestion logs for their instance? That'd be more reliable than his description at this point.

**Jordan:** yeah pulling them now. here's the last few days

```
2026-09-15T14:02:03Z sync_complete customer=whitfield-logistics batch=8811 records=389 errors=0 filtered_records=11
2026-09-16T14:01:47Z sync_complete customer=whitfield-logistics batch=8813 records=402 errors=1 filtered_records=6
2026-09-17T14:02:19Z sync_complete customer=whitfield-logistics batch=8815 records=210 errors=0 filtered_records=34
2026-09-18T14:02:11Z sync_complete customer=whitfield-logistics batch=8821 records=412 errors=0 filtered_records=2
2026-09-19T14:01:58Z sync_complete customer=whitfield-logistics batch=8822 records=201 errors=0 filtered_records=19
```

**AI:** That `errors=1` on the 16th is worth a look, though a single error on one batch might just be a transient thing. The filtered_records numbers are bouncing around too but nothing jumps out as a clean trend, more just noisy.

**Jordan:** yeah nothing here screams "this is the problem" to me either. records count also dips on the 17th, 210 vs the usual 400ish

**AI:** Could just be lower ticket volume that day though, not necessarily anything wrong with ingestion. Do we know if Whitfield's overall Salesforce case volume dipped on the 17th too?

**Jordan:** no idea, would need to ask ron or check something on their side I don't have access to

**AI:** What was the error on the 16th, do we have detail on that specific one?

**Jordan:** let me check... just says `error: field_mapping_exception field=custom_priority` no other detail

**AI:** That's a different kind of issue than "missing records" though — a single mapping exception on one record wouldn't explain an ongoing pattern of things missing from their reports, unless it's happening more than the log shows and only sometimes getting logged as an explicit error.

**Jordan:** could filtered_records actually be the missing stuff and errors are separate?

**AI:** Possibly, though we don't have a clear definition of what "filtered" means in this connector version, whether it's an exclusion rule doing what it's supposed to, or something being dropped incorrectly. Do you know if this customer has an active filter rule configured?

**Jordan:** let me check the admin console... yeah there's a rule that excludes anything tagged "internal" or "test", last modified back in august

**AI:** If that rule's been stable since August, it probably isn't the source of a new problem this week, unless something upstream started tagging more records as internal/test recently without anyone changing the rule itself.

**Jordan:** maybe, but I genuinely can't tell that from these numbers, they're all over the place day to day even before whatever's going on now

**AI:** Agreed, I don't think there's a clean signal in what we've pulled so far — could be worth asking Ron for something more specific than "missing," like an actual case number or two he can point to, so we're not just staring at aggregate counts.

**Jordan:** yeah let me ask him for specifics instead of guessing from logs

**Jordan:** ok while I wait on him, should I just escalate to eng now or wait for his answer first

**AI:** Depends how much time pressure you're under — if Priya needs an update soon, you could escalate with what we have and flag that specifics are pending, rather than waiting and risking another day without a response.

**Jordan:** yeah priya wants something today. let me draft the escalation

**AI:** Draft for #atlas-eng-escalations:

"Whitfield Logistics (whitfield-logistics) reporting missing feedback records, no confirmed specific case numbers yet — requested from their admin. Recent batch logs show a single field_mapping_exception on custom_priority (09-16) and generally noisy filtered_records counts (2–34/day range), nothing clearly anomalous on its own. Filter rule excluding 'internal'/'test' tags last modified in August, unclear if related. Flagging now given account manager pressure; will update with specifics once the customer's admin responds. Appreciate a look when possible."

**Jordan:** yeah post that. I'll update it once ron actually tells me something useful

**AI:** Want me to also note in the post that record volume was lower on the 17th, in case that's meaningful to whoever picks this up?

**Jordan:** eh, I don't think that's actually related, don't want to send eng chasing something that's probably just normal volume variance. leave it out
