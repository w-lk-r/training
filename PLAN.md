# Implementation Plan: Training App

A step-by-step plan building up complexity incrementally. Each phase is usable before moving to the next.

---

## Phase 1: Foundation

### 1.1 Supabase Setup
- [x] Create Supabase project
- [x] Add `@supabase/supabase-js` to a new `packages/db` workspace
- [x] Create shared Supabase client with env config
- [x] Set up auth (email/password to start)
- [x] Test: Can sign up, sign in from web
- [x] Test: Can sign up, sign in from mobile (⚠️ email redirect needs polish - works but UX is rough)

### 1.2 Legend State Setup
- [x] Add `@legendapp/state` and sync plugins to `packages/state`
- [x] Configure persistence: MMKV for mobile (Supabase client), localStorage for web (default)
- [x] Create basic `user$` observable with Supabase auth sync
- [x] Test: Auth state persists across app restarts

**Checkpoint:** ✅ Users can sign up/in, state persists offline

---

## Phase 2: Exercise Database

### 2.1 Exercise Schema
- [x] Create `exercises` table in Supabase:
  ```sql
  id, name, category, equipment, muscles, instructions
  ```
- [x] Seed with ~50 common exercises (squat, bench, clean, etc.)
- [x] Add types to `packages/db/types.ts`

### 2.2 Exercise State
- [ ] Create `exercises$` observable in Legend State
- [ ] Sync from Supabase (read-only for now, exercises are shared)
- [ ] Build simple exercise list/search component
- [ ] Test: Exercises load, searchable, work offline

**Checkpoint:** Browsable exercise library in both apps

---

## Phase 3: Training Maxes

### 3.1 Training Max Schema
- [ ] Create `training_maxes` table:
  ```sql
  id, user_id, exercise_id, value, unit, updated_at
  ```
- [ ] Row-level security: users see only their own

### 3.2 Training Max State & UI
- [ ] Create `trainingMaxes$` observable with Supabase sync
- [ ] Build "My Training Maxes" screen
- [ ] Add/edit/delete training maxes
- [ ] Test: TMs sync between devices, work offline

**Checkpoint:** Users can manage their training maxes

---

## Phase 4: Block Templates

### 4.1 Template Schema
- [ ] Create `block_templates` table:
  ```sql
  id, name, system, weeks, intensity_pattern, volume_pattern,
  workout_templates (jsonb), is_preset, created_by
  ```
- [ ] Seed with preset templates:
  - 4-week linear progression (powerlifting)
  - 3-week wave (weightlifting)
  - 6-week base building (running)

### 4.2 Template State & Browser
- [ ] Create `blockTemplates$` observable
- [ ] Browse presets and user-created templates
- [ ] Test: Can view template details, patterns make sense

**Checkpoint:** Template library viewable

---

## Phase 5: Blocks (Active Programs)

### 5.1 Block Schema
- [ ] Create `blocks` table:
  ```sql
  id, user_id, template_id, name, system,
  training_max_ids, weeks, current_week,
  intensity_by_week, volume_by_week,
  on_complete, tm_increment,
  status (active/paused/completed), started_at
  ```
- [ ] Create `block_workouts` table:
  ```sql
  id, block_id, day_index, exercises (jsonb)
  ```

### 5.2 Block State
- [ ] Create `blocks$` observable with sync
- [ ] Active blocks filter
- [ ] Current week tracking

### 5.3 Block Creation Wizard (Basic)
- [ ] Step 1: Choose template (or blank)
- [ ] Step 2: Select training maxes to use
- [ ] Step 3: Configure weeks, on_complete behavior
- [ ] Step 4: Review and create
- [ ] Test: Create a block, see it in active blocks

**Checkpoint:** Users can create and view active blocks

---

## Phase 6: Workout Execution

### 6.1 Workout Log Schema
- [ ] Create `workout_logs` table:
  ```sql
  id, user_id, block_id, workout_id, week,
  started_at, completed_at
  ```
- [ ] Create `set_logs` table:
  ```sql
  id, workout_log_id, exercise_id,
  set_number, prescribed_reps, prescribed_weight,
  actual_reps, actual_weight, rpe, notes
  ```

### 6.2 Workout State
- [ ] Create `activeWorkout$` for current session
- [ ] Create `workoutHistory$` for past logs

### 6.3 Workout Runner UI
- [ ] Display today's workout from block (with week-appropriate intensity/volume)
- [ ] Calculate weights from TM × percentage
- [ ] Log sets (actual reps/weight)
- [ ] Complete workout → advance block if needed
- [ ] Test: Run a full workout, data persists, TM-based weights correct

**Checkpoint:** Users can execute workouts and log sets

---

## Phase 7: Multi-Block & Pairing

### 7.1 Multiple Active Blocks
- [ ] UI to show all active blocks
- [ ] Each block tracks its own week independently
- [ ] Dashboard shows "today's workouts" across all blocks

### 7.2 Workout Pairing Schema
- [ ] Create `workout_pairings` table:
  ```sql
  id, user_id, name, workout_refs (jsonb)
  ```
  Where `workout_refs` = `[{blockId, workoutIndex}, ...]`

### 7.3 Pairing UI
- [ ] Create/edit pairings
- [ ] Start paired session → combines exercises into one workout
- [ ] Log goes to both blocks
- [ ] Test: Pair powerlifting + weightlifting, run as one session

**Checkpoint:** Multiple systems trainable together

---

## Phase 8: Block Completion & Progression

### 8.1 Auto-Progression
- [ ] Detect block completion (current_week > weeks)
- [ ] If `on_complete = 'repeat'`: increment TMs, reset to week 1
- [ ] If `on_complete = 'end'`: mark block completed

### 8.2 Block History
- [ ] View completed blocks
- [ ] See progression over multiple cycles
- [ ] Test: Complete a 4-week block, TM auto-increments, block resets

**Checkpoint:** Full block lifecycle working

---

## Phase 9: Web Stats Dashboard

### 9.1 Stats Queries
- [ ] Supabase views/functions for:
  - Volume over time (per exercise, per block)
  - Training max progression history
  - Workout frequency
  - PR tracking

### 9.2 Stats UI (Web)
- [ ] Charts: volume trends, TM progression
- [ ] Block completion history
- [ ] Exercise-specific history
- [ ] Test: Meaningful stats after several weeks of data

**Checkpoint:** Web dashboard shows training insights

---

## Phase 10: Wizard Enhancements

### 10.1 Smart Defaults
- [ ] Suggest TM increment based on system/exercise
- [ ] Suggest block length based on goal
- [ ] Suggest volume/intensity patterns

### 10.2 Exercise Suggestions
- [ ] Given a template, suggest exercises by category
- [ ] Swap suggestions (e.g., can't squat → leg press)

### 10.3 Schedule Assistant
- [ ] Given blocks, suggest weekly schedule
- [ ] Auto-create sensible pairings

**Checkpoint:** Wizard guides users to good programs

---

## Future: AI Coach (Optional)

### When Ready
- [ ] Add Vercel AI SDK
- [ ] Endpoint: natural language → Block schema
- [ ] Endpoint: "suggest alternative" → Exercise
- [ ] Chat interface for program Q&A
- [ ] AI outputs feed into same wizard/schema

---

## Technical Notes

### Shared Packages
```
packages/
  db/           # Supabase client, types, queries
  state/        # Legend State observables, sync config
  programs/     # Block templates, presets, validation
```

### Key Patterns
- All writes go through Legend State → syncs to Supabase
- Percentages stored as integers (70, not 0.7)
- Weights always stored in user's preferred unit
- `jsonb` for flexible nested structures (exercises in workouts)

### Offline Priority
- Mobile: Full offline capability via Legend State + MMKV
- Sync on reconnect, conflict resolution via timestamps
- Web: Can work offline but optimized for connected use
