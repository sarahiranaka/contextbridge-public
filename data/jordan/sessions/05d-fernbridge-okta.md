# Condition 5, Session D — Fernbridge Analytics (Okta), ~week 7

**Jordan:** fernbridge analytics, they're on okta actually, so should be closest to the runbook default. login's failing though, getting a generic "something went wrong" on atlas's side, nothing useful in the error

**AI:** Do we have anything more specific in Atlas's logs, even if the user-facing error is generic?

**Jordan:** let me check... ok server log just says `saml_auth_failed reason=unspecified customer=fernbridge-analytics`. helpful, thanks

**AI:** Not much to go on there. Is this failing for all their users or just some?

**Jordan:** their IT contact owen says it's everyone, every time

**AI:** Is there anything nonstandard about their Okta org — custom authorization policy, IP restrictions, anything like that?

**Jordan:** let me ask owen

**Jordan:** he says they do have IP allowlisting configured on their okta org, but doesn't think that's related since it hasn't changed recently

**AI:** If it hasn't changed recently, that probably tracks — allowlisting issues would usually show up as a change coinciding with when something changed, not out of nowhere.

**Jordan:** yeah agreed, probably not that

**Jordan:** actually hold on, owen just wrote back and said "oh wait, I think this might not even be atlas, our whole SSO tray has been flaky today, let me check with our okta admin team"

**AI:** That would explain a fully generic, consistent failure better than a config-specific issue would.

**Jordan:** yeah let's just wait on him then

**Jordan:** [an hour later] yeah confirmed, okta had some kind of outage today affecting several of their connected apps, not just atlas. owen says it's back now

**Jordan:** testing again... yeah login works now

**AI:** Good, sounds like there's nothing further needed on the Atlas side then, assuming it stays stable.

**Jordan:** yeah, false alarm basically on our end
