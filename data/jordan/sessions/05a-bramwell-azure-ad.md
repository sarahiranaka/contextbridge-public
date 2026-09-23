# Condition 5, Session A — Bramwell Foods (Azure AD), ~week 1

**Jordan:** working on bramwell foods SSO setup, they're on azure AD. following the runbook but it's written for okta so I'm translating as I go

**AI:** Want to walk through it step by step, or do you already have their metadata and just want to sanity-check the config?

**Jordan:** already have their metadata XML, let me paste the relevant bit

```
<EntityDescriptor entityID="https://sts.windows.net/8f2e.../">
  <IDPSSODescriptor>
    <KeyDescriptor use="signing">...</KeyDescriptor>
    <SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://login.microsoftonline.com/8f2e.../saml2"/>
  </IDPSSODescriptor>
</EntityDescriptor>
```

**AI:** That looks standard. Login's failing currently? What error are you seeing?

**Jordan:** just a generic "login failed, contact your administrator" on atlas's side

**AI:** With Azure AD, that generic error sometimes comes from the signing certificate not being trusted yet — like if Atlas has an old cert on file for their tenant and Azure rotated it recently. Want to check the cert fingerprint on both sides first?

**Jordan:** sure, let me check... no actually the fingerprints match, same cert

**AI:** Ok, not that then. Next guess would be the Reply URL / ACS URL not matching exactly — Azure AD is picky about that being an exact string match.

**Jordan:** yeah let me check what I actually sent them versus what's configured for their tenant

**Jordan:** ...ok found it, I sent them the generic template URL from the runbook, not the one with their actual tenant slug swapped in. classic

**AI:** That'd do it. Want me to generate the corrected URL from their tenant slug so you can resend it?

**Jordan:** yeah

**AI:** `https://auth.atlas.northstarlabs.example/saml/callback/bramwell-foods`

**Jordan:** sending that to their IT guy now, kevin. hopefully he can update it same day

**Jordan:** ok kevin updated it, testing now... login works. cool that was quick once we found it

**AI:** Good. Want to close this out as done or wait for a second user to test on their end too?

**Jordan:** I'll have kevin get one more person to try it before I mark it done
