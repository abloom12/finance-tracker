Absolutely. The first epic should not just be “collect setup info.” It should be a **trust-building flow** that gets the user to a useful forecast as quickly as possible, while avoiding the feeling of filling out financial paperwork.

Your current docs frame onboarding as the place where users configure “enough financial info to generate forecasts” , and the broader product philosophy is centered on short-term clarity: “How much can I safely spend before payday?” So Epic 1 should be designed around one question:

**What is the minimum setup needed to show a believable first Safe to Spend number?**

---

# Epic 1 — Onboarding & Setup

## Epic Goal

Help a new user enter just enough information for the app to generate an initial safe-to-spend forecast without overwhelming them.

The user should finish onboarding feeling:

> “Okay, this already gives me a useful number.”

Not:

> “I need to perfectly model my finances before this app works.”

---

# Recommended Onboarding Flow

## Step 1 — Welcome / Positioning

### Purpose

Set expectations emotionally and functionally.

### UX Goal

Make the app feel lightweight, calm, and nonjudgmental.

### Suggested Copy

> Know what you can safely spend until payday.
> No spreadsheets. No guilt. Just a clear number.

### Primary CTA

**Get started**

### Secondary CTA

**I’ll set this up later**

### Edge Cases

- User wants to skip onboarding.
- User is skeptical and wants to see demo data.
- User does not understand what “safe to spend” means yet.

### Recommendation

Allow skipping, but do not send them to an empty dashboard. If they skip, show a soft empty state:

> Add your balance and payday to see your first forecast.

---

## Step 2 — Current Balance

### User Story

As a user,
I want to enter my current balance,
so the app can calculate how much money I have available before payday.

### Required Input

- Current balance

### Optional Input

- Account nickname
- Whether this balance includes pending transactions

### Acceptance Criteria

- User can enter a positive balance.
- User can enter a zero balance.
- User can enter a negative balance.
- User can use decimals.
- App validates currency format.
- App stores balance locally/account-level depending on architecture.
- Forecast recalculates immediately after balance is saved.

### UX Notes

This should be the first meaningful input because it gives the app an anchor.

Use plain language:

> What’s your current balance?

Avoid:

> Enter account liquidity.

### Edge Cases

#### Negative Balance

The app should support this without judgment.

Instead of:

> You are overdrafted.

Use:

> Your balance is below zero right now. We’ll factor that in.

#### User Does Not Know Exact Balance

Offer:

> An estimate is okay. You can update it anytime.

This matters because precision anxiety can cause drop-off.

#### Multiple Accounts

For MVP, I would **not** support full multi-account setup during onboarding. That adds too much complexity.

Better MVP approach:

> Enter the balance you usually spend from.

Post-MVP can support multiple accounts.

#### Pending Transactions

Do not force this upfront. Maybe include a small helper:

> Use the number your banking app shows today.

---

## Step 3 — Payday Setup

### User Story

As a user,
I want to enter my payday schedule,
so the app knows how long my money needs to last.

### Required Inputs

- Next payday date
- Payday frequency

### Frequency Options

- Weekly
- Every 2 weeks
- Twice a month
- Monthly
- Irregular / I’ll enter manually

Your current story already includes weekly, biweekly, twice monthly, and monthly . I would add **irregular** because real-world income is messy.

### Acceptance Criteria

- User can select next payday date.
- User can choose a payday cadence.
- App calculates days until payday.
- App handles payday being today.
- App handles payday being tomorrow.
- App handles missed/old payday dates.
- Forecast updates immediately.

### UX Notes

This screen should feel like scheduling, not payroll configuration.

Suggested copy:

> When do you get paid next?

Then:

> How often does that usually happen?

### Edge Cases

#### Payday Is Today

This is important.

If payday is today, the forecast period may be zero days. The app should not divide by zero when calculating daily safe amount.

Possible UX:

> Payday is today. Want to start your next cycle from today?

Options:

- Yes, start new cycle
- Pick another date

#### User Selects Past Payday

Do not hard fail immediately. Explain:

> That date already passed. Choose your next expected payday.

#### Twice Monthly Complexity

Twice monthly is not always every 15 days. Users may be paid:

- 1st and 15th
- 15th and last day
- 5th and 20th
- Last business day and middle of month

For MVP, you can handle this in two levels:

**Simple MVP version:**

- Ask for next payday.
- Ask frequency: twice monthly.
- Predict the next one approximately.
- Let user manually correct later.

**Better MVP version:**

- Ask for two paydays per month:
  - First payday: day of month
  - Second payday: day of month / last day of month

I’d recommend the better version only if the date picker stays clean.

#### Irregular Income

Do not make freelancers/gig workers feel unsupported.

For MVP:

> I get paid irregularly

Then the app should ask:

> When is the next income you want to plan around?

Forecast can still work to that date.

---

## Step 4 — Upcoming Bills

### User Story

As a user,
I want to enter upcoming bills,
so the app can subtract obligations before showing what I can safely spend.

### Required Inputs

For each bill:

- Name
- Amount
- Due date

### Optional Inputs

- Recurrence
- Category
- Autopay toggle
- Notes

### Acceptance Criteria

- User can add one or more bills.
- User can skip bill setup.
- User can add bills due before payday.
- Bills after payday are not deducted from the current forecast cycle.
- Bills due today are included.
- Forecast updates after each bill.
- User can edit/remove a bill before finishing onboarding.

### UX Notes

This is the first place onboarding can start to feel heavy. Keep it optional and fast.

Suggested screen:

> Any bills before payday?

Primary actions:

- Add a bill
- Skip for now

When a bill is added, show a small running preview:

> Rent: $900 due May 15
> Phone: $80 due May 18

### Edge Cases

#### User Has No Bills Before Payday

Good. Let them continue.

Empty state:

> No problem. You can add bills later.

#### Bill Amount Unknown

Allow estimated bills.

Example:

> Amount can be approximate.

This is especially important for utilities.

#### Bill Due Same Day as Payday

Decision needed.

Usually, if a bill is due on payday, it should probably count in the next cycle **unless the due time matters**, which you likely do not want to model.

MVP rule:

- Bills due **before** payday are included.
- Bills due **on payday** are included only if user marks them as “before I get paid” or if payday income is not yet added.

Simpler UX:

> Bills due on payday can be included in this cycle if you usually pay them before your deposit lands.

This may be too advanced for onboarding, so for MVP I would include bills due on or before payday to be conservative.

#### Recurring Bills

During onboarding, recurrence should be optional.

Do not make the user configure complex recurrence rules here. Use:

- One-time
- Monthly
- Weekly
- Every 2 weeks

Save advanced recurrence for Settings/Bills.

---

## Step 5 — Optional Buffer

### User Story

As a user,
I want to set aside a small cushion,
so the app does not encourage me to spend every dollar.

### Required Input

None. This should be optional.

### UX Recommendation

I strongly recommend including a buffer, but defaulting it intelligently.

Suggested UX:

> Want to keep a cushion?

Options:

- No cushion
- $25
- $50
- $100
- Custom

Default could be `$50` or “No cushion” depending on your product philosophy.

Given the app’s “safe” framing, I’d use a default cushion but make it transparent:

> We’ll keep $50 untouched by default. You can change this anytime.

### Acceptance Criteria

- User can skip buffer.
- User can choose preset buffer.
- User can enter custom buffer.
- Buffer is subtracted from safe-to-spend.
- Buffer can exceed balance.
- Forecast handles negative result.

### Edge Cases

#### Buffer Greater Than Balance

Do not block it.

Message:

> Your cushion is larger than your current available balance, so your safe-to-spend may show below zero.

#### User Does Not Understand Buffer

Use “cushion,” not “buffer,” in UI.

“Cushion” is more human.

---

## Step 6 — Forecast Preview

### User Story

As a user,
I want to preview my first forecast,
so I can understand how the app calculated my safe-to-spend amount.

### Screen Should Show

- Current balance
- Bills before payday
- Cushion
- Days until payday
- Safe to Spend
- Daily safe amount

### Example

```text
Balance: $850
Upcoming bills: -$300
Cushion: -$50

Safe to Spend: $500
That’s about $41/day until payday.
```

### UX Notes

This screen is critical. It builds trust.

The product’s main value is not just the number. It is the user believing the number.

Suggested copy:

> Here’s your first forecast.

Then:

> You can adjust anything later.

### Acceptance Criteria

- Forecast preview appears before dashboard.
- User can go back and edit setup values.
- User can finish onboarding and land on Home.
- Home screen reflects the same forecast values.
- Forecast handles zero/negative safe-to-spend.

### Edge Cases

#### Safe to Spend Is Negative

Do not use alarming copy.

Avoid:

> You are overspent.

Use:

> Your upcoming bills are higher than your current available balance.

Then:

> We’ll show this clearly so you can plan around it.

#### Daily Safe Amount Is Negative

Display:

> You may need about $X more to cover this cycle.

Rather than:

> -$12/day

Negative daily numbers can be confusing.

#### No Bills Added

Preview still works:

```text
Balance: $500
Bills before payday: $0
Cushion: $50
Safe to Spend: $450
```

#### Payday Tomorrow

Daily amount can look huge if only one day remains. That is technically correct, but UX should clarify:

> Payday is tomorrow, so this forecast only covers 1 day.

---

# Suggested Epic Breakdown

## Feature 1.1 — Welcome & Setup Entry

### Stories

- As a new user, I want a brief explanation of the app, so I understand what setup will help me do.
- As a new user, I want to skip setup, so I can explore without committing.
- As a returning incomplete user, I want to resume setup, so I do not have to start over.

### Acceptance Criteria

- Welcome screen explains the app in one or two sentences.
- User can start onboarding.
- User can skip.
- App remembers incomplete onboarding state.
- Skipped users land on a useful empty state.

---

## Feature 1.2 — Balance Setup

### Stories

- As a user, I want to enter my current balance, so the app can calculate my safe-to-spend amount.
- As a user, I want to update an estimated balance later, so I do not need perfect accuracy during setup.

### Acceptance Criteria

- Balance input supports currency formatting.
- Balance supports decimals.
- Balance supports negative values.
- User can continue with an estimated amount.
- Invalid values show inline validation.

---

## Feature 1.3 — Payday Setup

### Stories

- As a user, I want to enter my next payday, so the app knows the forecast window.
- As a user with a recurring payday, I want to choose my pay frequency, so future cycles can be predicted.
- As a user with irregular income, I want to enter a one-off next payday, so the app still works for me.

### Acceptance Criteria

- User can pick next payday.
- User can choose payday frequency.
- App supports weekly, biweekly, twice monthly, monthly, and irregular.
- Past dates are handled gracefully.
- Payday today is handled safely.
- Forecast period is calculated correctly.

---

## Feature 1.4 — Bill Setup

### Stories

- As a user, I want to add upcoming bills, so the app can subtract them from my safe-to-spend amount.
- As a user, I want to skip bills, so setup does not feel mandatory.
- As a user, I want to mark a bill as recurring, so I do not need to enter it again later.

### Acceptance Criteria

- User can add bill name, amount, and due date.
- User can skip bill entry.
- User can add multiple bills.
- User can edit/delete bills before finishing onboarding.
- Bills before payday affect forecast.
- Bills after payday do not affect current forecast.
- Bills due today are included.
- Recurrence is optional.

---

## Feature 1.5 — Cushion Setup

### Stories

- As a user, I want to set a cushion, so the app helps me avoid spending down to zero.
- As a user, I want to skip the cushion, so I stay in control of the forecast assumptions.

### Acceptance Criteria

- User can choose no cushion.
- User can choose preset cushion values.
- User can enter custom cushion.
- Cushion affects safe-to-spend.
- User can change cushion later.

---

## Feature 1.6 — Forecast Preview

### Stories

- As a user, I want to see my first forecast before finishing setup, so I understand what the app calculated.
- As a user, I want to see how the number was calculated, so I can trust it.
- As a user, I want to edit setup values from the preview, so I can fix mistakes before reaching Home.

### Acceptance Criteria

- Preview shows current balance, bills, cushion, days until payday, safe-to-spend, and daily safe amount.
- User can edit setup values.
- User can complete onboarding.
- User lands on Home dashboard.
- Home forecast matches preview.

---

# Onboarding Data Model

For MVP, onboarding probably needs to collect these entities:

```ts
type UserSetup = {
  onboardingCompleted: boolean;
  balance: number | null;
  nextPayday: string | null;
  paydayFrequency:
    | "weekly"
    | "biweekly"
    | "twice_monthly"
    | "monthly"
    | "irregular"
    | null;
  cushionAmount: number;
};
```

```ts
type Bill = {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  recurrence: "none" | "weekly" | "biweekly" | "monthly" | null;
  includeInForecast: boolean;
};
```

You may eventually want accounts, income sources, and user preferences, but I would avoid over-modeling those during MVP onboarding.

---

# Forecast Logic Needed During Onboarding

The onboarding forecast can use a simple version of the full forecast engine:

```text
safe_to_spend =
current_balance
- bills_due_before_or_on_payday
- cushion
```

```text
daily_safe_amount =
safe_to_spend / max(days_until_payday, 1)
```

Important: use `max(days_until_payday, 1)` to avoid divide-by-zero issues when payday is today.

---

# Validation Rules

## Balance

Allow:

- `0`
- positive numbers
- negative numbers
- decimals

Reject:

- empty value when required
- non-numeric input
- absurdly large values if accidental, maybe over `$10,000,000`

## Bill Amount

Allow:

- positive decimals

Reject:

- zero
- negative numbers
- empty amount

## Bill Date

Allow:

- today
- future dates

Warn:

- bill date after payday

Reject or warn:

- past dates

For past bills, I would show:

> This due date has already passed. Add it anyway?

That allows users to represent unpaid overdue bills.

## Payday Date

Allow:

- today
- future dates

Reject:

- past dates

Exception: If the user is editing historical setup later, past paydays may matter, but not for MVP onboarding.

---

# Key UX Decisions to Make

## 1. Should onboarding be skippable?

Yes.

But skipped onboarding should not produce a fake forecast. It should show a guided empty state.

## 2. Should categories appear in onboarding?

No.

Categories are optional awareness, not core setup. Your docs already position Budget as optional rather than mandatory . Do not introduce category setup before the user sees value.

## 3. Should goals appear in onboarding?

Probably not for MVP.

Goals are useful but can complicate the first-run experience. Add them later after the user understands Safe to Spend.

## 4. Should bank connection appear in onboarding?

No, especially since bank integrations are explicitly delayed until later in your MVP direction .

## 5. Should notifications appear in onboarding?

Not in the first version.

Ask for notification permissions only after the user has seen value. Permission prompts during onboarding are often premature.

---

# Recommended First-Time UX Path

The ideal MVP onboarding flow:

```text
Welcome
→ Current Balance
→ Next Payday
→ Payday Frequency
→ Upcoming Bills
→ Cushion
→ Forecast Preview
→ Home
```

Keep the entire thing under roughly 2–3 minutes.

For a faster version:

```text
Welcome
→ Balance
→ Payday
→ Bills
→ Forecast Preview
```

Then ask about cushion later in Settings/Home.

---

# Empty, Partial, and Error States

## User skips everything

Home shows:

> Let’s calculate your Safe to Spend
> Add your balance and payday to see your first forecast.

CTA:

> Set up forecast

## User only adds balance

Home shows:

> Add payday to see how long this needs to last.

## User only adds payday

Home shows:

> Add your balance to calculate Safe to Spend.

## User adds balance and payday, no bills

Show forecast. Do not nag.

## User has negative safe-to-spend

Show:

> Upcoming bills are higher than your available balance.

Then:

> You may need $X more before payday.

## User has huge safe-to-spend

Still show it, but avoid overconfidence. The app only knows what the user entered.

Optional copy:

> Based on what you’ve added so far.

This is important for trust.

---

# MVP Ticket Backlog for Epic 1

## P0 — Required

1. Build onboarding shell/navigation.
2. Build welcome screen.
3. Build balance input screen.
4. Build payday date screen.
5. Build payday frequency selector.
6. Build upcoming bills setup screen.
7. Build forecast preview screen.
8. Persist onboarding state.
9. Add validation for balance, dates, and bill amounts.
10. Connect onboarding data to forecast calculation.
11. Route completed users to Home.
12. Route incomplete users back into onboarding or setup empty state.

## P1 — Strongly Recommended

1. Add cushion setup.
2. Add skip/resume onboarding support.
3. Add irregular income option.
4. Add bill recurrence option.
5. Add forecast explanation breakdown.
6. Add edit-from-preview behavior.

## P2 — Later

1. Multiple accounts.
2. Multiple income sources.
3. Notification permissions.
4. Bank connection.
5. Category setup.
6. Goal setup.
7. Import from calendar/email/bank.
8. Advanced recurrence rules.

---

# Definition of Done for Epic 1

Epic 1 is done when:

- A new user can complete setup from scratch.
- The app collects balance, payday, payday frequency, and optional bills.
- The app generates a first Safe to Spend number.
- The app explains the calculation clearly.
- The user can skip setup without hitting a broken dashboard.
- The user can resume incomplete setup.
- Edge cases like negative balance, payday today, no bills, and negative forecast are handled calmly.
- The completed setup feeds directly into the Home forecast.

---

# Strong Product Recommendation

Do **not** make onboarding too “financially complete.”

The app’s differentiation is not precision accounting. It is fast, emotionally calm financial runway clarity. For Epic 1, the winning move is:

> collect only what is needed to produce a useful first forecast, then let the user refine later.

The first onboarding experience should prove the product’s promise in minutes.
