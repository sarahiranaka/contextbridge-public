# Condition 5, Session C — Delacroix & Voss (PingFederate), ~week 5

**Jordan:** delacroix & voss SSO, they're on pingfederate. getting an error on login, something about assertion not being valid yet or expired, not sure which

**AI:** Can you paste the exact error text?

**Jordan:** "SAML Response rejected: Condition NotBefore is in the future" — something like that

**AI:** That specific error usually points to clock skew between the identity provider and the service provider. Worth asking their admin to check the Ping server's time sync.

**Jordan:** yeah let me ask

**Jordan:** their admin says he already checked, ping server syncs via ntp, confirmed accurate as of five minutes ago when he looked

**AI:** Ok, if he's actually confirmed that recently rather than just assuming it, that's a reasonable data point. Do we have an actual assertion timestamp from a failed attempt so we can compare against Atlas's received time directly, just to see if there's really a gap?

**Jordan:** yeah I can pull one

**Jordan:** assertion's NotBefore is 2026-09-14T10:15:32Z, atlas received the request at 2026-09-14T10:15:29Z

**AI:** That's only a 3-second gap, well within any normal tolerance window. So this probably isn't clock skew after all, or at least not a meaningful amount of it.

**Jordan:** yeah that basically rules out what he told me to check for, and he was right

**AI:** So we're back to not really knowing what's causing the rejection. Is it possible the error message itself is slightly misleading, or that there's a separate NotOnOrAfter condition also being evaluated that's the actual problem?

**Jordan:** I don't know, I don't have visibility into how atlas evaluates the full condition block, that's probably a platform-side thing

**AI:** Might be worth asking platform directly rather than guessing further from what we can see on the customer side.

**Jordan:** yeah, I'll ask, but I don't have a good guess for them beyond "here's the timestamp, doesn't look like skew, not sure what else to check." not much to go on
