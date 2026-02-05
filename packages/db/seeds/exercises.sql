-- Seed exercises table with ~50 common exercises
-- Run this in Supabase SQL Editor after creating the exercises table

INSERT INTO exercises (name, category, equipment, muscles, instructions) VALUES

-- SQUAT VARIATIONS
('Back Squat', 'squat', ARRAY['barbell', 'rack'], ARRAY['quads', 'glutes', 'core'], 'Bar on upper back, squat to parallel or below, drive through heels.'),
('Front Squat', 'squat', ARRAY['barbell', 'rack'], ARRAY['quads', 'glutes', 'core'], 'Bar in front rack position, elbows high, squat to depth maintaining upright torso.'),
('Goblet Squat', 'squat', ARRAY['dumbbell', 'kettlebell'], ARRAY['quads', 'glutes', 'core'], 'Hold weight at chest, squat between legs, elbows inside knees at bottom.'),
('Bulgarian Split Squat', 'squat', ARRAY['dumbbell', 'bench'], ARRAY['quads', 'glutes', 'hip_flexors'], 'Rear foot elevated on bench, lower until back knee nearly touches ground.'),
('Pause Squat', 'squat', ARRAY['barbell', 'rack'], ARRAY['quads', 'glutes', 'core'], 'Back squat with 2-3 second pause in the hole before driving up.'),
('Box Squat', 'squat', ARRAY['barbell', 'rack', 'box'], ARRAY['quads', 'glutes', 'hamstrings'], 'Squat back to box, pause briefly, then drive up explosively.'),
('Safety Bar Squat', 'squat', ARRAY['barbell', 'rack'], ARRAY['quads', 'glutes', 'core', 'back'], 'Use safety squat bar, handles forward, squat to depth.'),

-- HINGE VARIATIONS
('Conventional Deadlift', 'hinge', ARRAY['barbell'], ARRAY['hamstrings', 'glutes', 'back', 'core'], 'Feet hip-width, grip outside legs, drive through floor keeping bar close.'),
('Sumo Deadlift', 'hinge', ARRAY['barbell'], ARRAY['hamstrings', 'glutes', 'adductors', 'back'], 'Wide stance, grip inside legs, chest up, push floor away.'),
('Romanian Deadlift', 'hinge', ARRAY['barbell', 'dumbbell'], ARRAY['hamstrings', 'glutes', 'back'], 'Slight knee bend, hinge at hips, lower weight along legs, feel hamstring stretch.'),
('Trap Bar Deadlift', 'hinge', ARRAY['barbell'], ARRAY['quads', 'hamstrings', 'glutes', 'back'], 'Stand inside trap bar, grip handles, drive through floor.'),
('Good Morning', 'hinge', ARRAY['barbell', 'rack'], ARRAY['hamstrings', 'glutes', 'back'], 'Bar on back, slight knee bend, hinge forward until torso near parallel.'),
('Hip Thrust', 'hinge', ARRAY['barbell', 'bench'], ARRAY['glutes', 'hamstrings'], 'Upper back on bench, bar on hips, drive hips up squeezing glutes at top.'),
('Kettlebell Swing', 'hinge', ARRAY['kettlebell'], ARRAY['hamstrings', 'glutes', 'core'], 'Hinge and hike KB back, snap hips forward to float weight to chest height.'),
('Block Pull', 'hinge', ARRAY['barbell', 'platform'], ARRAY['hamstrings', 'glutes', 'back'], 'Deadlift from elevated blocks, focus on lockout strength.'),
('Deficit Deadlift', 'hinge', ARRAY['barbell', 'platform'], ARRAY['hamstrings', 'glutes', 'back'], 'Stand on platform 2-4 inches, deadlift with increased range of motion.'),

-- PUSH VARIATIONS
('Bench Press', 'push', ARRAY['barbell', 'bench', 'rack'], ARRAY['chest', 'triceps', 'shoulders'], 'Retract scaps, arch back, lower bar to chest, press up.'),
('Incline Bench Press', 'push', ARRAY['barbell', 'bench', 'rack'], ARRAY['chest', 'shoulders', 'triceps'], 'Bench at 30-45 degrees, press from upper chest.'),
('Close Grip Bench Press', 'push', ARRAY['barbell', 'bench', 'rack'], ARRAY['triceps', 'chest'], 'Hands shoulder-width, elbows tucked, emphasizes triceps.'),
('Overhead Press', 'push', ARRAY['barbell', 'rack'], ARRAY['shoulders', 'triceps', 'core'], 'Press bar from shoulders to lockout overhead, squeeze glutes.'),
('Push Press', 'push', ARRAY['barbell', 'rack'], ARRAY['shoulders', 'triceps', 'quads'], 'Dip and drive with legs to press weight overhead.'),
('Dumbbell Bench Press', 'push', ARRAY['dumbbell', 'bench'], ARRAY['chest', 'triceps', 'shoulders'], 'Press dumbbells from chest, can go deeper than barbell.'),
('Dumbbell Shoulder Press', 'push', ARRAY['dumbbell'], ARRAY['shoulders', 'triceps'], 'Press dumbbells from shoulders to overhead.'),
('Dips', 'push', ARRAY['bodyweight'], ARRAY['chest', 'triceps', 'shoulders'], 'Lower until upper arms parallel, press back up. Lean forward for chest emphasis.'),
('Push-Up', 'push', ARRAY['bodyweight'], ARRAY['chest', 'triceps', 'shoulders', 'core'], 'Hands shoulder-width, lower chest to floor, press up.'),

-- PULL VARIATIONS
('Barbell Row', 'pull', ARRAY['barbell'], ARRAY['back', 'lats', 'biceps'], 'Hinge forward, pull bar to lower chest/upper belly, squeeze shoulder blades.'),
('Pendlay Row', 'pull', ARRAY['barbell'], ARRAY['back', 'lats', 'biceps'], 'Strict row from dead stop on floor each rep, torso parallel.'),
('Dumbbell Row', 'pull', ARRAY['dumbbell', 'bench'], ARRAY['back', 'lats', 'biceps'], 'One arm at a time, pull to hip, squeeze lat at top.'),
('Pull-Up', 'pull', ARRAY['bodyweight'], ARRAY['lats', 'biceps', 'back'], 'Hang from bar, pull chin over bar, control the descent.'),
('Chin-Up', 'pull', ARRAY['bodyweight'], ARRAY['lats', 'biceps', 'back'], 'Underhand grip pull-up, more bicep involvement.'),
('Lat Pulldown', 'pull', ARRAY['cable', 'machine'], ARRAY['lats', 'biceps', 'back'], 'Pull bar to upper chest, squeeze lats, control return.'),
('Seated Cable Row', 'pull', ARRAY['cable', 'machine'], ARRAY['back', 'lats', 'biceps'], 'Pull handle to torso, squeeze shoulder blades, return with control.'),
('Face Pull', 'pull', ARRAY['cable', 'bands'], ARRAY['shoulders', 'traps', 'back'], 'Pull rope to face, externally rotate at end, great for shoulder health.'),
('Chest Supported Row', 'pull', ARRAY['dumbbell', 'bench'], ARRAY['back', 'lats', 'biceps'], 'Lie face down on incline bench, row dumbbells, eliminates momentum.'),

-- OLYMPIC LIFTS
('Clean', 'olympic', ARRAY['barbell', 'platform'], ARRAY['full_body'], 'Pull bar from floor, receive in front squat position.'),
('Power Clean', 'olympic', ARRAY['barbell', 'platform'], ARRAY['full_body'], 'Clean caught in partial squat, no full depth required.'),
('Hang Clean', 'olympic', ARRAY['barbell', 'platform'], ARRAY['full_body'], 'Start from hang position above knees, clean from there.'),
('Snatch', 'olympic', ARRAY['barbell', 'platform'], ARRAY['full_body'], 'Pull bar from floor to overhead in one motion, receive in overhead squat.'),
('Power Snatch', 'olympic', ARRAY['barbell', 'platform'], ARRAY['full_body'], 'Snatch caught in partial squat, no full depth required.'),
('Hang Snatch', 'olympic', ARRAY['barbell', 'platform'], ARRAY['full_body'], 'Start from hang position, snatch from there.'),
('Clean and Jerk', 'olympic', ARRAY['barbell', 'platform'], ARRAY['full_body'], 'Clean the bar, then jerk overhead.'),
('Clean Pull', 'olympic', ARRAY['barbell', 'platform'], ARRAY['back', 'traps', 'hamstrings', 'glutes'], 'First and second pull of clean without receiving.'),
('Snatch Pull', 'olympic', ARRAY['barbell', 'platform'], ARRAY['back', 'traps', 'hamstrings', 'glutes'], 'First and second pull of snatch without receiving.'),

-- CARRY VARIATIONS
('Farmer Carry', 'carry', ARRAY['dumbbell', 'kettlebell'], ARRAY['core', 'traps', 'forearms', 'full_body'], 'Heavy weights in each hand, walk with control, stay tall.'),
('Suitcase Carry', 'carry', ARRAY['dumbbell', 'kettlebell'], ARRAY['core', 'traps', 'forearms'], 'Weight in one hand only, resist lateral flexion.'),
('Front Rack Carry', 'carry', ARRAY['kettlebell', 'barbell'], ARRAY['core', 'shoulders', 'back'], 'Weight in front rack position, walk with upright torso.'),
('Overhead Carry', 'carry', ARRAY['dumbbell', 'kettlebell'], ARRAY['core', 'shoulders'], 'Weight locked out overhead, walk with control.'),

-- CORE
('Plank', 'core', ARRAY['bodyweight'], ARRAY['core'], 'Hold push-up position on forearms, body straight, brace abs.'),
('Dead Bug', 'core', ARRAY['bodyweight'], ARRAY['core', 'hip_flexors'], 'On back, extend opposite arm/leg while maintaining flat lower back.'),
('Ab Wheel Rollout', 'core', ARRAY['bodyweight'], ARRAY['core', 'lats'], 'Roll wheel forward maintaining hollow body, pull back with abs.'),
('Hanging Leg Raise', 'core', ARRAY['bodyweight'], ARRAY['core', 'hip_flexors'], 'Hang from bar, raise legs to parallel or higher, control descent.'),
('Pallof Press', 'core', ARRAY['cable', 'bands'], ARRAY['core'], 'Press cable/band straight out, resist rotation, hold and return.'),

-- ACCESSORY
('Bicep Curl', 'accessory', ARRAY['dumbbell', 'barbell', 'cable'], ARRAY['biceps'], 'Curl weight up, control the descent, keep elbows stationary.'),
('Tricep Pushdown', 'accessory', ARRAY['cable'], ARRAY['triceps'], 'Push cable down, lock out elbows, control return.'),
('Lateral Raise', 'accessory', ARRAY['dumbbell'], ARRAY['shoulders'], 'Raise dumbbells to side until arms parallel to floor.'),
('Calf Raise', 'accessory', ARRAY['machine', 'bodyweight', 'dumbbell'], ARRAY['calves'], 'Rise onto toes, squeeze at top, lower with control.'),
('Leg Curl', 'accessory', ARRAY['machine'], ARRAY['hamstrings'], 'Curl weight toward glutes, squeeze hamstrings, control return.'),
('Leg Extension', 'accessory', ARRAY['machine'], ARRAY['quads'], 'Extend legs until straight, squeeze quads, control return.');
