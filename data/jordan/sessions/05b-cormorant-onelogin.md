# Condition 5, Session B — Cormorant Health (OneLogin), ~week 3, handled by Renee Castillo

**Renee:** hey, working on cormorant health's SSO, they're on onelogin. logins are going through but half their users are landing without the right permissions in atlas, like they're authenticated but not mapped to the right team

**AI:** Does Atlas provision team membership from a SAML attribute, or is that handled separately from login?

**Renee:** it's supposed to come from an attribute onelogin sends, something like department or group

**AI:** Do you have the actual assertion attributes coming through?

**Renee:** yeah here's a sample

```
<Attribute Name="User.Department">
  <AttributeValue>Customer Success</AttributeValue>
</Attribute>
<Attribute Name="memberOf">
  <AttributeValue>CN=CS-Team,OU=Groups,DC=cormorant,DC=local</AttributeValue>
</Attribute>
```

**AI:** Atlas's mapping expects an attribute literally named `department`, lowercase — `User.Department` wouldn't match that, so I'd guess that's the whole issue.

**Renee:** hang on, that can't be the whole thing though — if the attribute name were just wrong, it'd be wrong for every single user, not half of them. we've got some users mapping fine right now

**AI:** That's a fair point, I was assuming this was affecting everyone. Do you know what's different about the users who are working correctly?

**Renee:** let me check... actually yeah, the ones failing are all in a specific sub-OU, "Contractors." the ones working are regular employees

**AI:** Could be contractors have a separate SAML app definition on OneLogin's side with its own attribute mapping, distinct from the main employee config.

**Renee:** yeah, confirmed with their IT, contractors do have a separate app. so there might be two separate things wrong here, not one

**AI:** Makes sense — the department attribute name mismatch would still be worth fixing regardless, but it might not even be the reason the contractor group specifically fails, if their app sends something different entirely.

**Renee:** right, I don't want to assume it's the same root cause for both groups until I actually see the contractor app's attribute statement. let me get that from their IT before we fix anything

**AI:** Good call, no point patching based on a guess for that half.
