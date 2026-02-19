(function() {
    'use strict';

    // ==========================================
    //  WHEEL OF LIFE CATEGORIES (6 areas)
    // ==========================================
    const CATEGORIES = [
        { id: 'fun_environment', name: 'Fun\nEnvironment', color: '#c4996a' },
        { id: 'relationships', name: 'Relationships\nFamily', color: '#7c6fba' },
        { id: 'money_finances', name: 'Money\nFinances', color: '#c4996a' },
        { id: 'career_contribution', name: 'Career\nContribution', color: '#6a9dba' },
        { id: 'personal_growth', name: 'Personal\nGrowth', color: '#7c6fba' },
        { id: 'health_energy', name: 'Health\nEnergy', color: '#6aad99' }
    ];

    // ==========================================
    //  BUSINESS WHEEL CATEGORIES (6 areas)
    // ==========================================
    const BUSINESS_CATEGORIES = [
        { id: 'leadership_vision', name: 'Leadership\nVision', color: '#b08858' },
        { id: 'operations_systems', name: 'Operations\nSystems', color: '#6a9dba' },
        { id: 'finance_risk', name: 'Finance\nRisk', color: '#c4996a' },
        { id: 'marketing_sales', name: 'Marketing\nSales', color: '#c07a73' },
        { id: 'services_innovation', name: 'Services\nInnovation', color: '#6aad99' },
        { id: 'people_culture', name: 'People\nCulture', color: '#8a70a8' }
    ];

    // ==========================================
    //  HEALTH WHEEL CATEGORIES (6 areas)
    // ==========================================
    const HEALTH_CATEGORIES = [
        { id: 'sleep_recovery', name: 'Sleep\nRecovery', color: '#6a7bab' },
        { id: 'nutrition_fuel', name: 'Nutrition\nFuel', color: '#5a9a78' },
        { id: 'exercise_movement', name: 'Exercise\nMovement', color: '#c07a73' },
        { id: 'mindfulness_calm', name: 'Mindfulness\nCalm', color: '#8a70a8' },
        { id: 'nature_outdoors', name: 'Nature\nOutdoors', color: '#6aad99' },
        { id: 'community_connection', name: 'Community\nConnection', color: '#b08858' }
    ];

    // ==========================================
    //  FINANCES WHEEL CATEGORIES (6 areas)
    // ==========================================
    const FINANCES_CATEGORIES = [
        { id: 'giving_will', name: 'Giving\n& Will', color: '#c07a73' },
        { id: 'ira_retirement', name: 'IRA\nRetirement', color: '#8a70a8' },
        { id: 'investments', name: 'Investments\nGrowth', color: '#6aad99' },
        { id: 'budget', name: 'Budget\nPlanning', color: '#6a9dba' },
        { id: 'insurance', name: 'Insurance\nProtection', color: '#c4996a' },
        { id: 'debt_free', name: 'Debt\nMortgage', color: '#5a9ab0' }
    ];

    // Category descriptions for guide popup
    const CATEGORY_DESCRIPTIONS = {
        'health_energy': 'Physical fitness, mental health, sleep, nutrition — the foundation your brain needs to function',
        'relationships': 'Partner, children, friends, community — connection is medicine for the restless mind',
        'career_contribution': 'Work performance, career growth, impact, purpose — channel your hyperfocus here',
        'money_finances': 'Income, savings, investments, financial freedom — structure creates calm for ADHD brains',
        'personal_growth': 'Learning, mindset, meditation, emotional intelligence — training your brain to work for you',
        'fun_environment': 'Hobbies, rest, travel, home space — ADHD brains need novelty and recharge time',
        'leadership_vision': 'Strategic direction, leadership skills, vision setting, decision-making, company culture',
        'operations_systems': 'Processes, efficiency, automation, SOPs, project management, infrastructure',
        'finance_risk': 'Revenue, expenses, cash flow, budgeting, risk management, compliance',
        'marketing_sales': 'Lead generation, brand awareness, sales pipeline, conversions, customer acquisition',
        'services_innovation': 'Product development, service quality, R&D, competitive advantage, new ideas',
        'people_culture': 'Hiring, team development, retention, morale, collaboration, company values',
        'sleep_recovery': 'Sleep quality, bedtime routine, wind-down habits, naps, recovery, rest days',
        'nutrition_fuel': 'Meal prep, hydration, healthy eating, supplements, reducing processed food',
        'exercise_movement': 'Workouts, stretching, walking, sports, gym, active lifestyle',
        'mindfulness_calm': 'Meditation, breathing exercises, journaling, therapy, stress management',
        'nature_outdoors': 'Outdoor walks, sunlight exposure, gardening, parks, nature immersion',
        'community_connection': 'Social activities, support groups, volunteering, friendships, family time',
        'giving_will': 'Charitable giving, estate planning, will preparation, legacy planning, tithing',
        'ira_retirement': 'IRA contributions, 401k, retirement planning, pension, social security strategy',
        'investments': 'Stocks, bonds, real estate, index funds, portfolio rebalancing, passive income',
        'budget': 'Monthly budget, expense tracking, savings goals, emergency fund, cash flow planning',
        'insurance': 'Life insurance, health insurance, auto, home, disability, umbrella policies',
        'debt_free': 'Mortgage strategy, debt payoff plan, credit card debt, student loans, refinancing, debt snowball'
    };

    // ==========================================
    //  DAILY FOCUS SCHEDULES
    // ==========================================
    const DAILY_FOCUS_SCHEDULE = {
        1: ['health_energy'],       // Monday
        2: ['money_finances'],      // Tuesday
        3: ['career_contribution'], // Wednesday
        4: ['personal_growth'],     // Thursday
        5: ['fun_environment'],     // Friday
        6: ['__free__'],            // Saturday - auto-pick weakest
        0: ['relationships']        // Sunday
    };

    const BUSINESS_DAILY_FOCUS_SCHEDULE = {
        1: ['operations_systems'],   // Monday
        2: ['finance_risk'],         // Tuesday
        3: ['marketing_sales'],      // Wednesday
        4: ['services_innovation'],  // Thursday
        5: ['people_culture'],       // Friday
        6: ['__free__'],             // Saturday - auto-pick weakest
        0: ['leadership_vision']     // Sunday
    };

    const HEALTH_DAILY_FOCUS_SCHEDULE = {
        1: ['exercise_movement'],    // Monday
        2: ['nutrition_fuel'],       // Tuesday
        3: ['mindfulness_calm'],     // Wednesday
        4: ['nature_outdoors'],      // Thursday
        5: ['community_connection'], // Friday
        6: ['__free__'],             // Saturday - auto-pick weakest
        0: ['sleep_recovery']        // Sunday
    };

    const FINANCES_DAILY_FOCUS_SCHEDULE = {
        1: ['budget'],               // Monday
        2: ['debt_free'],            // Tuesday
        3: ['investments'],          // Wednesday
        4: ['ira_retirement'],       // Thursday
        5: ['insurance'],            // Friday
        6: ['__free__'],             // Saturday - auto-pick weakest
        0: ['giving_will']           // Sunday
    };

    function getLowestWheelCategory() {
        try {
            var scores;
            if (currentMode === 'business') scores = calculateBusinessWheelScores();
            else if (currentMode === 'health') scores = calculateHealthWheelScores();
            else if (currentMode === 'finances') scores = calculateFinancesWheelScores();
            else scores = calculateWheelScores();
            if (!scores || scores.length === 0) return getActiveCategories()[0].id;
            var lowest = scores.reduce(function(min, s) { return s.score < min.score ? s : min; }, scores[0]);
            return lowest.id;
        } catch(e) {
            return getActiveCategories()[0].id;
        }
    }

    function resolveFocusCategories(rawCats) {
        if (rawCats.length === 1 && rawCats[0] === '__free__') {
            return [getLowestWheelCategory()];
        }
        return rawCats;
    }

    function getTodayFocusCategories() {
        var day = new Date().getDay();
        var raw;
        if (currentMode === 'business') {
            raw = BUSINESS_DAILY_FOCUS_SCHEDULE[day] || [];
        } else if (currentMode === 'health') {
            raw = HEALTH_DAILY_FOCUS_SCHEDULE[day] || [];
        } else if (currentMode === 'finances') {
            raw = FINANCES_DAILY_FOCUS_SCHEDULE[day] || [];
        } else {
            raw = DAILY_FOCUS_SCHEDULE[day] || [];
        }
        return resolveFocusCategories(raw);
    }

    function isFreeDay() {
        var day = new Date().getDay();
        var schedule = currentMode === 'business' ? BUSINESS_DAILY_FOCUS_SCHEDULE : currentMode === 'health' ? HEALTH_DAILY_FOCUS_SCHEDULE : currentMode === 'finances' ? FINANCES_DAILY_FOCUS_SCHEDULE : DAILY_FOCUS_SCHEDULE;
        var raw = schedule[day] || [];
        return raw.length === 1 && raw[0] === '__free__';
    }

    function catDisplayName(name) {
        return name ? name.replace(/\n/g, ' ') : '';
    }

    // HTML version — wraps second word in span for mobile CSS hiding
    function catDisplayNameHtml(name) {
        if (!name) return '';
        var parts = name.split('\n');
        if (parts.length > 1) {
            return parts[0] + '<span class="cat-second-word"> ' + parts[1] + '</span>';
        }
        return name;
    }

    function getTodayFocusLabel(useHtml) {
        var focusCats = getTodayFocusCategories();
        var allCats = getActiveCategories();
        var fn = useHtml ? catDisplayNameHtml : catDisplayName;
        var label = focusCats.map(function(id) {
            var cat = allCats.find(function(c) { return c.id === id; });
            return cat ? fn(cat.name) : id;
        }).join(', ');
        if (isFreeDay()) {
            return label;
        }
        return label;
    }

    function getTomorrowFocusCategories() {
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var day = tomorrow.getDay();
        var raw;
        if (currentMode === 'business') {
            raw = BUSINESS_DAILY_FOCUS_SCHEDULE[day] || [];
        } else if (currentMode === 'health') {
            raw = HEALTH_DAILY_FOCUS_SCHEDULE[day] || [];
        } else if (currentMode === 'finances') {
            raw = FINANCES_DAILY_FOCUS_SCHEDULE[day] || [];
        } else {
            raw = DAILY_FOCUS_SCHEDULE[day] || [];
        }
        return resolveFocusCategories(raw);
    }

    function getTomorrowFocusLabel(useHtml) {
        var focusCats = getTomorrowFocusCategories();
        var allCats = CATEGORIES.concat(BUSINESS_CATEGORIES).concat(HEALTH_CATEGORIES).concat(FINANCES_CATEGORIES);
        var fn = useHtml ? catDisplayNameHtml : catDisplayName;
        return focusCats.map(function(id) {
            var cat = allCats.find(function(c) { return c.id === id; });
            return cat ? fn(cat.name) : id;
        }).join(', ');
    }

    function getTomorrowDayName() {
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toLocaleDateString('en-US', { weekday: 'long' });
    }

    const CATEGORY_MIGRATION = {
        'health': 'health_energy',
        'family': 'relationships',
        'love': 'relationships',
        'career': 'career_contribution',
        'finances': 'money_finances',
        'finance': 'money_finances',
        'growth': 'personal_growth',
        'contribution': 'personal_growth',
        'fun': 'fun_environment',
        'environment': 'fun_environment',
        'leadership': 'leadership_vision',
        'marketing': 'marketing_sales',
        'sales': 'marketing_sales',
        'operations': 'operations_systems',
        'financials': 'finance_risk',
        'innovation': 'services_innovation',
        'strategy': 'leadership_vision',
        'celebration': 'people_culture'
    };

    // ==========================================
    //  COMPREHENSIVE HOME EXERCISE LIBRARY
    // ==========================================
    const EXERCISES = [
        // === YOGA & STRETCHING ===
        { name: 'Downward Dog', emoji: '🧘', equipment: 'yoga mat', focus: ['core', 'arms', 'spine'], duration: '30 sec hold',
          howTo: '1. Start on hands and knees\n2. Tuck toes, lift hips up and back\n3. Press chest toward thighs\n4. Keep arms straight, heels reaching down\n5. Hold and breathe deeply' },
        { name: 'Cat-Cow Stretch', emoji: '🐱', equipment: 'yoga mat', focus: ['spine', 'core'], duration: '10 reps',
          howTo: '1. Start on hands and knees\n2. Inhale: drop belly, lift head (Cow)\n3. Exhale: round spine, tuck chin (Cat)\n4. Flow slowly between positions\n5. Focus on each vertebra moving' },
        { name: 'Seated Spinal Twist', emoji: '🔄', equipment: 'yoga mat', focus: ['spine', 'core'], duration: '30 sec each side',
          howTo: '1. Sit with legs extended\n2. Bend right knee, cross over left leg\n3. Place left elbow outside right knee\n4. Twist torso to the right, look back\n5. Hold, breathe, then switch sides' },
        { name: 'Pigeon Pose', emoji: '🕊️', equipment: 'yoga mat', focus: ['butt', 'spine'], duration: '45 sec each side',
          howTo: '1. From downward dog, bring right knee forward\n2. Place right shin on mat (angled)\n3. Extend left leg straight behind you\n4. Square hips, fold forward over front leg\n5. Breathe deeply into the hip stretch' },
        { name: 'Child\'s Pose', emoji: '🙏', equipment: 'yoga mat', focus: ['spine', 'core'], duration: '30 sec',
          howTo: '1. Kneel on mat, big toes touching\n2. Sit back on heels\n3. Fold forward, arms extended overhead\n4. Forehead rests on mat\n5. Breathe into your lower back' },
        { name: 'Cobra Stretch', emoji: '🐍', equipment: 'yoga mat', focus: ['spine', 'core'], duration: '20 sec hold',
          howTo: '1. Lie face down, hands under shoulders\n2. Press into hands, lift chest off floor\n3. Keep elbows slightly bent\n4. Squeeze shoulder blades together\n5. Look slightly upward, hold and breathe' },
        { name: 'Thread the Needle', emoji: '🧵', equipment: 'yoga mat', focus: ['spine', 'arms'], duration: '30 sec each side',
          howTo: '1. Start on hands and knees\n2. Slide right arm under left arm\n3. Let right shoulder and temple rest on floor\n4. Keep left hand planted or reach overhead\n5. Feel the twist through upper back' },
        { name: 'Standing Forward Fold', emoji: '🙇', equipment: 'none', focus: ['spine', 'core'], duration: '30 sec',
          howTo: '1. Stand with feet hip-width apart\n2. Hinge at hips, fold forward\n3. Let head hang heavy\n4. Grab opposite elbows and sway gently\n5. Bend knees slightly if needed' },
        { name: 'Warrior II', emoji: '⚔️', equipment: 'yoga mat', focus: ['butt', 'core', 'arms'], duration: '30 sec each side',
          howTo: '1. Step feet wide apart (4 feet)\n2. Turn right foot out 90°, left foot slightly in\n3. Bend right knee over ankle\n4. Extend arms out to sides, gaze right\n5. Sink deeper, engage core and glutes' },
        { name: 'Bridge Pose', emoji: '🌉', equipment: 'yoga mat', focus: ['butt', 'spine', 'core'], duration: '30 sec hold',
          howTo: '1. Lie on back, knees bent, feet flat\n2. Arms at sides, palms down\n3. Press feet into floor, lift hips\n4. Squeeze glutes at the top\n5. Roll spine down slowly to release' },
        { name: 'Supine Spinal Twist', emoji: '🌀', equipment: 'yoga mat', focus: ['spine', 'core'], duration: '30 sec each side',
          howTo: '1. Lie on back, hug knees to chest\n2. Drop both knees to the right\n3. Extend left arm out to the side\n4. Turn head to look left\n5. Let gravity deepen the twist, breathe' },

        // === DUMBBELLS ===
        { name: 'Dumbbell Bicep Curls', emoji: '💪', equipment: 'dumbbells', focus: ['arms'], duration: '12 reps',
          howTo: '1. Stand holding dumbbells at sides, palms forward\n2. Keep elbows pinned to ribs\n3. Curl weights up toward shoulders\n4. Squeeze at the top briefly\n5. Lower slowly (3 seconds down)' },
        { name: 'Dumbbell Overhead Press', emoji: '🏋️', equipment: 'dumbbells', focus: ['arms', 'core'], duration: '10 reps',
          howTo: '1. Hold dumbbells at shoulder height\n2. Palms facing forward\n3. Press weights straight overhead\n4. Fully extend arms without locking elbows\n5. Lower back to shoulders with control' },
        { name: 'Dumbbell Tricep Kickback', emoji: '💪', equipment: 'dumbbells', focus: ['arms'], duration: '12 reps each arm',
          howTo: '1. Hinge forward at hips, flat back\n2. Hold dumbbell, upper arm parallel to floor\n3. Extend forearm back until arm is straight\n4. Squeeze tricep at full extension\n5. Return slowly, keep upper arm still' },
        { name: 'Goblet Squat', emoji: '🏋️', equipment: 'dumbbells', focus: ['butt', 'core'], duration: '12 reps',
          howTo: '1. Hold one dumbbell vertically at chest\n2. Stand with feet shoulder-width apart\n3. Squat down, pushing knees out\n4. Go as deep as comfortable\n5. Drive through heels to stand' },
        { name: 'Dumbbell Lateral Raise', emoji: '🦅', equipment: 'dumbbells', focus: ['arms'], duration: '12 reps',
          howTo: '1. Stand holding dumbbells at sides\n2. Slight bend in elbows\n3. Raise arms out to sides to shoulder height\n4. Pause briefly at the top\n5. Lower slowly with control' },
        { name: 'Dumbbell Deadlift', emoji: '🏋️', equipment: 'dumbbells', focus: ['butt', 'core', 'spine'], duration: '10 reps',
          howTo: '1. Hold dumbbells in front of thighs\n2. Hinge at hips, push butt back\n3. Lower weights along legs to shin level\n4. Keep back flat, core tight\n5. Squeeze glutes to stand up' },

        // === RESISTANCE BANDS ===
        { name: 'Banded Glute Bridge', emoji: '🍑', equipment: 'resistance bands', focus: ['butt', 'core'], duration: '15 reps',
          howTo: '1. Place band just above knees\n2. Lie on back, knees bent, feet flat\n3. Push knees outward against band\n4. Lift hips up, squeeze glutes hard\n5. Hold 2 sec at top, lower slowly' },
        { name: 'Band Pull-Apart', emoji: '↔️', equipment: 'resistance bands', focus: ['arms', 'spine'], duration: '15 reps',
          howTo: '1. Hold band with both hands in front, arms extended\n2. Hands shoulder-width apart\n3. Pull band apart by squeezing shoulder blades\n4. Arms move outward to a T shape\n5. Return slowly to start' },
        { name: 'Banded Squat Walk', emoji: '🦀', equipment: 'resistance bands', focus: ['butt', 'core'], duration: '10 steps each way',
          howTo: '1. Place band above knees or around ankles\n2. Get into quarter-squat position\n3. Step sideways, keeping tension on band\n4. Take 10 steps right, then 10 steps left\n5. Keep chest up, core engaged' },
        { name: 'Banded Bicep Curl', emoji: '💪', equipment: 'resistance bands', focus: ['arms'], duration: '15 reps',
          howTo: '1. Stand on band with both feet\n2. Hold band ends with palms up\n3. Curl hands toward shoulders\n4. Keep elbows at sides\n5. Lower slowly against resistance' },
        { name: 'Banded Kickback', emoji: '🦵', equipment: 'resistance bands', focus: ['butt'], duration: '12 reps each leg',
          howTo: '1. Loop band around ankles\n2. Stand on one leg, hold something for balance\n3. Kick other leg straight back\n4. Squeeze glute at the top\n5. Return slowly, repeat, switch legs' },

        // === JUMPING ROPE ===
        { name: 'Basic Jump Rope', emoji: '⏭️', equipment: 'jump rope', focus: ['core', 'butt'], duration: '1 minute',
          howTo: '1. Hold handles lightly, elbows at sides\n2. Swing rope with wrists, not arms\n3. Jump just high enough to clear rope\n4. Land on balls of feet softly\n5. Keep a steady rhythm, breathe!' },
        { name: 'High Knees Jump Rope', emoji: '🏃', equipment: 'jump rope', focus: ['core', 'butt'], duration: '30 seconds',
          howTo: '1. Jump rope with alternating high knees\n2. Drive each knee to hip height\n3. Stay on balls of feet\n4. Pump arms naturally\n5. Keep core tight throughout' },

        // === WEIGHTED HULA HOOP ===
        { name: 'Weighted Hula Hoop', emoji: '⭕', equipment: 'weighted hula hoop', focus: ['core', 'butt', 'spine'], duration: '2 minutes',
          howTo: '1. Place hoop around waist\n2. Give it a good spin\n3. Shift weight in a circular motion\n4. Keep core engaged, slight knee bend\n5. Relax shoulders, find your rhythm' },
        { name: 'Hula Hoop Side-to-Side', emoji: '⭕', equipment: 'weighted hula hoop', focus: ['core', 'spine'], duration: '1 minute',
          howTo: '1. Start hooping normally\n2. Shift your motion from circular to side-to-side\n3. Rock hips left and right\n4. Engages obliques more intensely\n5. Keep breathing steadily' },

        // === EXERCISE BALL ===
        { name: 'Ball Wall Squat', emoji: '🏐', equipment: 'exercise ball', focus: ['butt', 'core'], duration: '12 reps',
          howTo: '1. Place ball between lower back and wall\n2. Feet shoulder-width, slightly forward\n3. Squat down, ball rolls with you\n4. Go to 90° knee bend\n5. Push through heels to stand' },
        { name: 'Ball Plank', emoji: '🏐', equipment: 'exercise ball', focus: ['core', 'arms'], duration: '30 sec hold',
          howTo: '1. Place forearms on exercise ball\n2. Extend legs behind you, toes on floor\n3. Keep body in straight line\n4. Engage core, don\'t let hips sag\n5. Hold steady, breathe normally' },
        { name: 'Ball Back Extension', emoji: '🏐', equipment: 'exercise ball', focus: ['spine', 'core', 'butt'], duration: '12 reps',
          howTo: '1. Lie face down over ball, hips on top\n2. Feet on floor (wide stance for stability)\n3. Hands behind head or at chest\n4. Lift chest up, squeeze lower back\n5. Lower slowly, repeat' },

        // === FOAM ROLLER ===
        { name: 'Foam Roll Thoracic Spine', emoji: '🧱', equipment: 'foam roller', focus: ['spine'], duration: '1 minute',
          howTo: '1. Place roller under upper back\n2. Cross arms over chest\n3. Lift hips slightly off ground\n4. Roll slowly from mid-back to upper back\n5. Pause on tight spots, breathe into them' },
        { name: 'Foam Roll Glutes', emoji: '🧱', equipment: 'foam roller', focus: ['butt', 'spine'], duration: '45 sec each side',
          howTo: '1. Sit on roller, hands behind for support\n2. Cross right ankle over left knee\n3. Lean into right glute\n4. Roll slowly back and forth\n5. Find tender spots, hold and breathe' },
        { name: 'Foam Roll IT Band', emoji: '🧱', equipment: 'foam roller', focus: ['butt'], duration: '45 sec each side',
          howTo: '1. Lie on side, roller under outer thigh\n2. Support yourself with forearm and top foot\n3. Roll from hip to just above knee\n4. Pause on tight spots\n5. Switch sides and repeat' },

        // === PULL-UP & PUSH-UP BAR ===
        { name: 'Pull-Ups', emoji: '🔝', equipment: 'pull-up bar', focus: ['arms', 'core'], duration: '5-8 reps',
          howTo: '1. Grip bar with palms facing away, shoulder-width\n2. Hang with arms fully extended\n3. Pull yourself up until chin clears bar\n4. Squeeze shoulder blades together\n5. Lower slowly with control' },
        { name: 'Dead Hang', emoji: '🙌', equipment: 'pull-up bar', focus: ['arms', 'spine'], duration: '30-60 sec',
          howTo: '1. Grip bar overhead, palms forward\n2. Let your body hang freely\n3. Relax shoulders, feel spine decompress\n4. Breathe deeply\n5. GREAT for spinal decompression after sitting!' },
        { name: 'Push-Ups', emoji: '🔻', equipment: 'push-up bar', focus: ['arms', 'core'], duration: '10-15 reps',
          howTo: '1. Grip push-up bars, hands under shoulders\n2. Body in straight line, core tight\n3. Lower chest between bars\n4. Push back up to full extension\n5. Bars allow deeper range of motion' },
        { name: 'Tricep Dips (Bar)', emoji: '🔽', equipment: 'pull-up bar', focus: ['arms'], duration: '10 reps',
          howTo: '1. If bar allows, grip with hands behind you\n2. Feet forward, weight on hands\n3. Lower body by bending elbows\n4. Go to 90° elbow bend\n5. Push back up, squeeze triceps' },

        // === AB WHEEL ===
        { name: 'Ab Wheel Rollout', emoji: '☸️', equipment: 'ab wheel', focus: ['core', 'arms'], duration: '8-10 reps',
          howTo: '1. Kneel on mat, grip ab wheel handles\n2. Start with wheel under shoulders\n3. Roll forward slowly, extending body\n4. Go as far as you can with flat back\n5. Use abs to pull wheel back to start' },
        { name: 'Ab Wheel Knee Tuck', emoji: '☸️', equipment: 'ab wheel', focus: ['core'], duration: '10 reps',
          howTo: '1. Place feet on ab wheel (or use straps)\n2. Get into plank position, hands on floor\n3. Pull knees toward chest, rolling wheel in\n4. Extend legs back out\n5. Keep core engaged throughout' },

        // === SLIDERS ===
        { name: 'Slider Mountain Climbers', emoji: '🏔️', equipment: 'sliders', focus: ['core', 'arms'], duration: '30 seconds',
          howTo: '1. Start in plank, feet on sliders\n2. Slide right knee toward chest\n3. Slide back while bringing left knee in\n4. Keep hips level, core tight\n5. Move smoothly and controlled' },
        { name: 'Slider Pike', emoji: '🔺', equipment: 'sliders', focus: ['core', 'arms'], duration: '10 reps',
          howTo: '1. Start in plank, feet on sliders\n2. Keep legs straight, slide feet toward hands\n3. Lift hips high into pike position\n4. Slide back to plank with control\n5. Engage core throughout movement' },
        { name: 'Slider Reverse Lunge', emoji: '🦵', equipment: 'sliders', focus: ['butt', 'core'], duration: '10 each leg',
          howTo: '1. Stand with one foot on slider\n2. Slide foot back into lunge position\n3. Lower until front thigh is parallel to floor\n4. Slide foot back to standing\n5. Keep torso upright, core engaged' },
        { name: 'Slider Hamstring Curl', emoji: '🍑', equipment: 'sliders', focus: ['butt', 'core'], duration: '12 reps',
          howTo: '1. Lie on back, heels on sliders\n2. Lift hips into bridge position\n3. Slide heels away from body, extending legs\n4. Curl heels back toward butt\n5. Keep hips lifted throughout' },
        { name: 'Slider Lateral Lunge', emoji: '↔️', equipment: 'sliders', focus: ['butt', 'core'], duration: '10 each side',
          howTo: '1. Stand with one foot on slider\n2. Slide foot out to the side\n3. Bend standing leg, pushing hips back\n4. Slide foot back to center\n5. Keep chest up, sliding leg straight' },
        { name: 'Slider Body Saw', emoji: '🪚', equipment: 'sliders', focus: ['core', 'arms'], duration: '10 reps',
          howTo: '1. Forearm plank with feet on sliders\n2. Push body backward, sliding feet away\n3. Pull body forward past starting position\n4. Move like a saw, back and forth\n5. Keep core braced, dont let hips sag' },

        // === TRAMPOLINE ===
        { name: 'Trampoline Bounce', emoji: '🤸', equipment: 'trampoline', focus: ['core', 'butt'], duration: '2 minutes',
          howTo: '1. Stand in center of mini trampoline\n2. Begin gentle bouncing\n3. Keep core engaged, arms relaxed\n4. Gradually increase bounce height\n5. Great for lymphatic drainage and energy!' },
        { name: 'Trampoline Twist', emoji: '🤸', equipment: 'trampoline', focus: ['core', 'spine'], duration: '1 minute',
          howTo: '1. Bounce on trampoline\n2. While airborne, twist hips left and right\n3. Keep upper body facing forward\n4. Arms can swing naturally for balance\n5. Works obliques and loosens spine' },
        { name: 'Trampoline High Knees', emoji: '🤸', equipment: 'trampoline', focus: ['core', 'butt'], duration: '1 minute',
          howTo: '1. Bounce on trampoline\n2. Alternate driving knees up high\n3. Pump arms like running\n4. Stay on balls of feet\n5. Gets heart rate up quickly!' },

        // === MEDITATION ===
        { name: 'Seated Meditation', emoji: '🧘‍♂️', equipment: 'none', focus: ['spine'], duration: '3 minutes',
          howTo: '1. Sit comfortably, spine tall\n2. Close eyes, rest hands on knees\n3. Focus on breath: in through nose, out through mouth\n4. Notice thoughts without judgment, let them pass\n5. Return focus to breath each time mind wanders' },
        { name: 'Body Scan Meditation', emoji: '🧘‍♀️', equipment: 'yoga mat', focus: ['spine', 'core'], duration: '3 minutes',
          howTo: '1. Lie on your back, arms at sides\n2. Close eyes, breathe deeply\n3. Scan from toes to head, noticing sensations\n4. Release tension in each body part\n5. Especially release jaw, shoulders, and hips' },
        { name: 'Standing Breathing Exercise', emoji: '🌬️', equipment: 'none', focus: ['core', 'spine'], duration: '1 minute',
          howTo: '1. Stand tall, feet hip-width apart\n2. Inhale deeply for 4 counts through nose\n3. Hold for 4 counts\n4. Exhale slowly for 6 counts through mouth\n5. Repeat 5 times. Notice tension leaving body' },

        // === KICKBOXING ===
        { name: 'Jab-Cross Combo', emoji: '🥊', equipment: 'none', focus: ['arms', 'core'], duration: '30 seconds',
          howTo: '1. Stand in fighting stance (one foot forward)\n2. Jab: quick punch with front hand\n3. Cross: powerful punch with back hand, rotate hips\n4. Return hands to guard position each time\n5. Stay light on feet, keep core engaged' },
        { name: 'Front Kicks', emoji: '🦵', equipment: 'none', focus: ['butt', 'core'], duration: '10 each leg',
          howTo: '1. Stand in fighting stance\n2. Lift front knee up\n3. Extend leg forward in a snap kick\n4. Retract quickly back to guard\n5. Alternate legs, engage core for balance' },
        { name: 'Roundhouse Kicks', emoji: '🥋', equipment: 'none', focus: ['butt', 'core', 'spine'], duration: '8 each side',
          howTo: '1. Stand sideways to target\n2. Pivot on front foot\n3. Swing back leg in an arc\n4. Strike with top of foot or shin\n5. Great for hip mobility and glute power' },
        { name: 'Uppercut-Hook Combo', emoji: '🥊', equipment: 'none', focus: ['arms', 'core'], duration: '30 seconds',
          howTo: '1. Fighting stance, hands at chin\n2. Uppercut: drive fist upward with legs and hips\n3. Hook: swing arm in horizontal arc\n4. Alternate: left uppercut, right hook\n5. Power comes from hip rotation, not just arms' },

        // === CARDIO ===
        { name: 'Burpees', emoji: '🔥', equipment: 'none', focus: ['core', 'arms', 'butt'], duration: '8 reps',
          howTo: '1. Stand tall\n2. Drop into squat, hands on floor\n3. Jump feet back to plank\n4. Do a push-up (optional)\n5. Jump feet to hands, explode up with a jump' },
        { name: 'Mountain Climbers', emoji: '⛰️', equipment: 'none', focus: ['core', 'arms'], duration: '30 seconds',
          howTo: '1. Start in plank position\n2. Drive right knee toward chest\n3. Quickly switch legs\n4. Keep hips level, core tight\n5. Move as fast as you can with good form' },
        { name: 'Squat Jumps', emoji: '⬆️', equipment: 'none', focus: ['butt', 'core'], duration: '10 reps',
          howTo: '1. Stand with feet shoulder-width apart\n2. Squat down to 90°\n3. Explode upward into a jump\n4. Land softly, immediately squat again\n5. Arms swing for momentum' },
        { name: 'High Knees', emoji: '🏃', equipment: 'none', focus: ['core', 'butt'], duration: '30 seconds',
          howTo: '1. Stand tall, feet hip-width\n2. Run in place, driving knees high\n3. Each knee should reach hip height\n4. Pump arms naturally\n5. Stay on balls of feet, quick turnover' },

        // === BODYWEIGHT CORE & GLUTE FOCUS ===
        { name: 'Glute Bridge', emoji: '🍑', equipment: 'yoga mat', focus: ['butt', 'core'], duration: '15 reps',
          howTo: '1. Lie on back, knees bent, feet flat\n2. Drive through heels to lift hips\n3. Squeeze glutes HARD at the top\n4. Hold 2 seconds\n5. Lower slowly. Feel the burn!' },
        { name: 'Fire Hydrants', emoji: '🔥', equipment: 'yoga mat', focus: ['butt'], duration: '12 each side',
          howTo: '1. Start on hands and knees\n2. Keep knee bent at 90°\n3. Lift right knee out to the side\n4. Raise until thigh is parallel to floor\n5. Lower slowly, repeat, switch sides' },
        { name: 'Donkey Kicks', emoji: '🫏', equipment: 'yoga mat', focus: ['butt', 'core'], duration: '12 each side',
          howTo: '1. Start on hands and knees\n2. Keep right knee bent at 90°\n3. Press right foot toward ceiling\n4. Squeeze glute at the top\n5. Lower without touching knee down, repeat' },
        { name: 'Plank Hold', emoji: '🏗️', equipment: 'yoga mat', focus: ['core', 'arms'], duration: '30-45 sec',
          howTo: '1. Forearms on mat, elbows under shoulders\n2. Extend legs back, toes on floor\n3. Body in perfectly straight line\n4. Engage core, squeeze glutes\n5. Don\'t hold breath! Breathe steadily' },
        { name: 'Side Plank', emoji: '📐', equipment: 'yoga mat', focus: ['core', 'arms'], duration: '20 sec each side',
          howTo: '1. Lie on right side, forearm on mat\n2. Stack feet or stagger for balance\n3. Lift hips, body in straight line\n4. Top arm on hip or extended up\n5. Hold, then switch sides' },
        { name: 'Bicycle Crunches', emoji: '🚴', equipment: 'yoga mat', focus: ['core'], duration: '20 reps',
          howTo: '1. Lie on back, hands behind head\n2. Lift shoulders off mat\n3. Bring right knee to left elbow\n4. Extend right leg while switching\n5. Left knee to right elbow. Keep pedaling!' },
        { name: 'Superman Hold', emoji: '🦸', equipment: 'yoga mat', focus: ['spine', 'butt', 'core'], duration: '10 reps, 3 sec hold',
          howTo: '1. Lie face down, arms extended overhead\n2. Simultaneously lift arms, chest, and legs\n3. Squeeze glutes and lower back\n4. Hold for 3 seconds at top\n5. Lower slowly. Counteracts sitting posture!' },
        { name: 'Dead Bug', emoji: '🐛', equipment: 'yoga mat', focus: ['core', 'spine'], duration: '10 reps each side',
          howTo: '1. Lie on back, arms pointing to ceiling\n2. Knees bent at 90° over hips\n3. Lower right arm and left leg simultaneously\n4. Keep lower back pressed into floor\n5. Return to start, switch sides' }
    ];

    // ==========================================
    //  SELF-PRAISE / INTERNAL VALIDATION
    // ==========================================
    const SELF_PRAISES = [
        "Are you glad you finished it so fast? Way to go!",
        "Notice how capable you are when you commit to something?",
        "You chose this yourself. That inner fire is all yours.",
        "Feel that momentum building? That's YOUR power at work.",
        "Another one done. You're proving to yourself what you're made of.",
        "How does it feel to keep your promises to yourself?",
        "You just showed up for yourself again. That's real strength.",
        "Look at you — following through because YOU believe in yourself.",
        "Every task you complete is a vote for the person you're becoming.",
        "You decided, you acted, you delivered. That's self-trust in action.",
        "Can you feel your confidence growing? You earned that.",
        "You chose it. You owned it. That's pure power.",
        "This is what living with purpose looks like. You're doing it.",
        "Your future self is thanking you right now. Keep going.",
        "Each completed action rewires your brain for success. Feel the shift?",
        "You ARE your own biggest cheerleader. And the crowd goes wild!",
        "The discipline you're building right now is changing your life.",
        "Notice the difference between thinking about it and actually doing it? You did it.",
        "You're not waiting for permission anymore. You're taking charge.",
        "How good does it feel to be someone who finishes what they start?",
        "Results are permanent and you just created one. Feel that power!",
        "Your actions are speaking louder than any doubt ever could.",
        "Remember this feeling of accomplishment — you created it yourself.",
        "You're building unstoppable momentum. One action at a time.",
        "The person who started this task and the person finishing it just leveled up.",
        "This is for YOU. Every action builds the life you want.",
        "That inner voice saying 'I can do this' — you just proved it right again.",
        "Progress isn't always visible, but you can feel it. Trust that.",
        "You chose purpose. That's a win worth celebrating!",
        "Every completed task is evidence that you are exactly who you want to be.",
        // NCI-inspired (Chase Hughes FATE + Six-Axis Model) self-authority praises
        "You just exercised the most powerful form of influence — self-influence.",
        "Authority isn't given. It's built through actions like this one.",
        "Your brain just recorded evidence of who you really are. A finisher.",
        "Discipline is choosing your future self over your present self. You just did that.",
        "Focus creates authority. Authority creates momentum. You have both now.",
        "You led yourself with clarity and action. That's true leadership.",
        "Every completed action raises your internal compliance threshold. You expect more from yourself now.",
        "The tribe follows the person who follows through. You just proved you're that person.",
        "Your emotional state just shifted. That's neurological proof of progress.",
        "Expectancy drives behavior. You just raised your own expectations. Level up.",
        // ADHD-specific encouragement
        "Your ADHD brain just crushed it. That dopamine hit? You earned it.",
        "You stayed focused and finished. That focus is your superpower!",
        "You started AND finished. Legendary. Your brain is incredible.",
        "You chose NOW. That's executive function at its finest!",
        "ADHD brains collect wins like gold coins. You just got one. Stack another!",
        "You showed up and got it DONE. Pure power move.",
        "Your working memory held strong and you delivered. Champion energy!",
        "Smooth transition between tasks — your brain is getting stronger every day!",
        "Your brain loves novelty? Here's some: you just completed another task! Fresh win!",
        "That focus? That drive? That's your ADHD superpower in full effect."
    ];

    // ==========================================
    //  NCI-POWERED GAMIFICATION SYSTEM
    //  Based on Chase Hughes' FATE Model (Focus, Authority, Tribe, Emotion)
    //  + Six-Axis Model (Suggestibility, Focus, Openness, Connection, Compliance, Expectancy)
    // ==========================================

    // --- LEVEL & XP SYSTEM (NCI Authority: Identity reinforcement builds self-authority) ---
    const LEVEL_THRESHOLDS = [
        { xp: 0,    title: 'Starter',            emoji: '🌱', msg: 'Every master was once a beginner. You just took the first step.' },
        { xp: 100,  title: 'Spark',              emoji: '⚡', msg: 'You have the spark. Most people never even start.' },
        { xp: 300,  title: 'Mover',              emoji: '🚀', msg: 'You are now in motion. Objects in motion stay in motion.' },
        { xp: 600,  title: 'Builder',            emoji: '🏗️', msg: 'You are building something real. Brick by brick, action by action.' },
        { xp: 1000, title: 'Achiever',           emoji: '🏆', msg: 'You don\'t just set goals — you achieve them. That\'s rare.' },
        { xp: 1500, title: 'Crusher',            emoji: '💎', msg: 'You crush resistance like it\'s nothing. Unstoppable momentum.' },
        { xp: 2500, title: 'Unstoppable',        emoji: '🔥', msg: 'They can\'t stop what they can\'t catch. You are Unstoppable.' },
        { xp: 4000, title: 'Legend',              emoji: '👑', msg: 'Legends aren\'t born. They\'re built through relentless action.' },
        { xp: 6000, title: 'Master of Purpose',  emoji: '✨', msg: 'You\'ve mastered the art of living with purpose. You ARE the authority.' }
    ];

    function getLevel(xp) {
        var level = LEVEL_THRESHOLDS[0];
        for (var i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
            if (xp >= LEVEL_THRESHOLDS[i].xp) { level = LEVEL_THRESHOLDS[i]; level.index = i; break; }
        }
        var nextLevel = LEVEL_THRESHOLDS[level.index + 1] || null;
        var progress = nextLevel ? ((xp - level.xp) / (nextLevel.xp - level.xp)) * 100 : 100;
        return { current: level, next: nextLevel, progress: Math.min(100, Math.round(progress)), index: level.index };
    }

    // --- COMBO MULTIPLIER (NCI Focus: Novelty + momentum = manufactured focus) ---
    var comboCount = 0;
    var lastCompletionTime = 0;
    var COMBO_WINDOW_MS = 30 * 60 * 1000; // 30 minutes

    function getComboMultiplier(combo) {
        if (combo <= 1) return 1;
        if (combo === 2) return 1.5;
        if (combo === 3) return 2;
        if (combo === 4) return 2.5;
        return 3; // 5+ = 3x max
    }

    function updateCombo() {
        // Pro gate: free users don't get combo multiplier
        if (!isProUser()) {
            comboCount = 1;
            lastCompletionTime = Date.now();
            return 1;
        }
        var now = Date.now();
        if (lastCompletionTime && (now - lastCompletionTime) <= COMBO_WINDOW_MS) {
            comboCount++;
        } else {
            comboCount = 1;
        }
        lastCompletionTime = now;
        // Store in localStorage for session persistence
        try {
            var comboKey = 'lwp_combo_' + new Date().toDateString();
            localStorage.setItem(comboKey, JSON.stringify({ count: comboCount, lastTime: lastCompletionTime }));
        } catch(e) {}
        return comboCount;
    }

    function restoreCombo() {
        try {
            var comboKey = 'lwp_combo_' + new Date().toDateString();
            var saved = JSON.parse(localStorage.getItem(comboKey) || '{}');
            if (saved.count && saved.lastTime && (Date.now() - saved.lastTime) <= COMBO_WINDOW_MS) {
                comboCount = saved.count;
                lastCompletionTime = saved.lastTime;
            }
        } catch(e) {}
    }

    // --- ACHIEVEMENT BADGES (NCI Emotion: Surprise rewards anchor positive feelings) ---
    // type: 'permanent' = earn once forever
    // type: 'daily' = resets every day, earn again for XP
    // type: 'weekly' = resets every Monday, earn again for XP
    const BADGE_DEFINITIONS = [
        // === DAILY BADGES (re-earnable every day) ===
        { id: 'hat_trick',       name: 'Hat Trick',        emoji: '🎩', desc: '3 actions in one day', xp: 50, type: 'daily',
          check: function(d) { var t = new Date().toDateString(); var c = 0; d.log.forEach(function(e) { if (e.date === t) c++; }); return c >= 3; } },
        { id: 'pentakill',       name: 'Pentakill',        emoji: '⚔️', desc: '5 actions in one day', xp: 75, type: 'daily',
          check: function(d) { var t = new Date().toDateString(); var c = 0; d.log.forEach(function(e) { if (e.date === t) c++; }); return c >= 5; } },
        { id: 'early_bird',      name: 'Early Bird',       emoji: '🐦', desc: 'Complete action before 8 AM', xp: 40, type: 'daily',
          check: function(d) { var h = new Date().getHours(); return h < 8 && d.log.length > 0 && d.log[d.log.length - 1].date === new Date().toDateString(); } },
        { id: 'night_owl',       name: 'Night Owl',        emoji: '🦉', desc: 'Complete action after 10 PM', xp: 30, type: 'daily',
          check: function(d) { var h = new Date().getHours(); return h >= 22 && d.log.length > 0 && d.log[d.log.length - 1].date === new Date().toDateString(); } },
        { id: 'speed_demon',     name: 'Speed Demon',      emoji: '⚡', desc: 'Finish action in under 5 min', xp: 35, type: 'daily',
          check: function(d) { return d.log.some(function(e) { return e.date === new Date().toDateString() && e.actualMinutes && e.actualMinutes < 5; }); } },
        { id: 'comeback_kid',    name: 'Comeback Kid',     emoji: '💪', desc: 'Complete an overdue action', xp: 60, type: 'daily',
          check: function(d) { return d._justCompletedOverdue === true; } },
        { id: 'combo_king',      name: 'Combo King',       emoji: '👊', desc: 'Reach a 5x combo today', xp: 100, type: 'daily',
          check: function() { return comboCount >= 5; } },

        // === WEEKLY BADGES (re-earnable every Monday) ===
        { id: 'category_sweep',  name: 'Category Sweep',   emoji: '🌈', desc: 'Actions in all 6 categories this week', xp: 150, type: 'weekly',
          check: function(d) { var wStart = getWeekStart(); var cats = {}; d.log.forEach(function(e) { if (e.date && new Date(e.date) >= wStart && e.category) cats[e.category] = true; }); return Object.keys(cats).length >= 6; } },
        { id: 'week_warrior',    name: 'Week Warrior',     emoji: '⚔️', desc: '20+ actions this week', xp: 100, type: 'weekly',
          check: function(d) { var wStart = getWeekStart(); var c = 0; d.log.forEach(function(e) { if (e.date && new Date(e.date) >= wStart) c++; }); return c >= 20; } },
        { id: 'full_wheel',      name: 'Full Wheel',       emoji: '☯️', desc: 'All 6 wheel categories > 5', xp: 200, type: 'weekly',
          check: function(d) { try { var s = _cachedWheelScores; if (!s) return false; return s.every(function(c) { return c.score > 5; }); } catch(e) { return false; } } },
        { id: 'streak_keeper',   name: 'Streak Keeper',    emoji: '🔗', desc: 'Maintain streak all 7 days', xp: 120, type: 'weekly',
          check: function(d) { return d.streak >= 7; } },

        // === PERMANENT BADGES (earn once forever) ===
        { id: 'first_blood',     name: 'First Blood',     emoji: '🗡️', desc: 'Complete your first action', xp: 25, type: 'permanent',
          check: function(d) { return d.log.length >= 1; } },
        { id: 'streak_master',   name: 'Streak Master',    emoji: '🔥', desc: '7-day streak', xp: 100, type: 'permanent',
          check: function(d) { return d.bestStreak >= 7; } },
        { id: 'iron_will',       name: 'Iron Will',        emoji: '🛡️', desc: '30-day streak', xp: 500, type: 'permanent',
          check: function(d) { return d.bestStreak >= 30; } },
        { id: 'century_club',    name: 'Century Club',     emoji: '💯', desc: '100 total actions', xp: 250, type: 'permanent',
          check: function(d) { return d.log.length >= 100; } },
        { id: 'outcome_crusher', name: 'Outcome Crusher',  emoji: '🎯', desc: 'Complete 5 outcomes', xp: 300, type: 'permanent',
          check: function(d) { var c = 0; d.outcomes.forEach(function(o) { if (o.completed) c++; }); if (d.archived) d.archived.forEach(function(o) { if (o.completed) c++; }); return c >= 5; } },
        { id: 'momentum_500',    name: 'Momentum 500',     emoji: '🚂', desc: 'Reach 500 momentum points', xp: 75, type: 'permanent',
          check: function(d) { return d.totalMomentum >= 500; } },
        { id: 'founding_member',  name: 'Founding Member',  emoji: '🌟', desc: 'One of the first 100 users', xp: 500, type: 'permanent',
          check: function() { return isFoundingMember; } }
    ];

    // Helper: get start of current week (Monday)
    function getWeekStart() {
        var now = new Date();
        var day = now.getDay();
        var diff = day === 0 ? 6 : day - 1; // Monday = 0 offset
        var monday = new Date(now);
        monday.setDate(now.getDate() - diff);
        monday.setHours(0, 0, 0, 0);
        return monday;
    }

    // Badge storage: data.badges is now array of { id, date, count }
    // Migration: if old format (string array), convert
    function migrateBadges() {
        if (!data.badges) { data.badges = []; return; }
        if (data.badges.length > 0 && typeof data.badges[0] === 'string') {
            // Old format: ['first_blood', 'hat_trick'] → new format
            data.badges = data.badges.map(function(id) {
                return { id: id, date: new Date().toDateString(), count: 1 };
            });
        }
    }

    function isBadgeActive(badgeEntry, badgeDef) {
        if (!badgeEntry) return false;
        var today = new Date().toDateString();
        if (badgeDef.type === 'daily') {
            return badgeEntry.date === today;
        }
        if (badgeDef.type === 'weekly') {
            var wStart = getWeekStart();
            return new Date(badgeEntry.date) >= wStart;
        }
        return true; // permanent
    }

    function getBadgeEntry(badgeId) {
        if (!data.badges) return null;
        return data.badges.find(function(b) { return b.id === badgeId; }) || null;
    }

    function checkBadges() {
        if (!data) return [];
        migrateBadges();
        var newBadges = [];
        var today = new Date().toDateString();
        BADGE_DEFINITIONS.forEach(function(badge) {
            // Pro gate: free users only get daily badges
            if (badge.type !== 'daily' && !isProUser()) return;
            var entry = getBadgeEntry(badge.id);
            // Skip if already active this period
            if (entry && isBadgeActive(entry, badge)) return;
            try {
                if (badge.check(data)) {
                    if (entry) {
                        // Re-earned: update date + increment count
                        entry.date = today;
                        entry.count = (entry.count || 1) + 1;
                    } else {
                        // First time earn
                        data.badges.push({ id: badge.id, date: today, count: 1 });
                    }
                    data.totalMomentum += (badge.xp || 0);
                    newBadges.push(badge);
                }
            } catch(e) {}
        });
        return newBadges;
    }

    // --- DAILY CHALLENGES (NCI Expectancy: Setting expectations creates compliance) ---
    const CHALLENGE_POOL = [
        { id: 'three_before_noon', text: 'Complete 3 actions before noon', xp: 50, emoji: '☀️',
          check: function(d) { var t = new Date().toDateString(); var c = 0; d.log.forEach(function(e) { if (e.date === t) { try { var h = parseInt(e.time.split(':')[0]); if (h < 12) c++; } catch(x) { c++; } } }); return c >= 3; } },
        { id: 'weakest_link', text: 'Work on your weakest wheel category', xp: 30, emoji: '🎯',
          check: function(d) { try { var s = _cachedWheelScores; if (!s) return false; var weakest = s.reduce(function(m, c) { return c.score < m.score ? c : m; }, s[0]); var t = new Date().toDateString(); return d.log.some(function(e) { return e.date === t && e.category === weakest.id; }); } catch(e) { return false; } } },
        { id: 'speed_round', text: 'Finish an action in under 10 minutes', xp: 25, emoji: '⏱️',
          check: function(d) { return d.log.some(function(e) { return e.date === new Date().toDateString() && e.actualMinutes && e.actualMinutes <= 10; }); } },
        { id: 'category_explorer', text: 'Complete actions in 3 different categories', xp: 40, emoji: '🗺️',
          check: function(d) { var t = new Date().toDateString(); var cats = {}; d.log.forEach(function(e) { if (e.date === t && e.category) cats[e.category] = true; }); return Object.keys(cats).length >= 3; } },
        { id: 'combo_warrior', text: 'Build a 3x combo streak', xp: 35, emoji: '🔥',
          check: function() { return comboCount >= 3; } },
        { id: 'priming_power', text: 'Start your day with Power Priming', xp: 20, emoji: '🧠',
          check: function() { try { var pk = 'lwp_priming_times_' + new Date().toDateString(); var pt = JSON.parse(localStorage.getItem(pk) || '[]'); return pt.length > 0; } catch(e) { return false; } } },
        { id: 'five_alive', text: 'Complete 5 actions today', xp: 45, emoji: '🖐️',
          check: function(d) { var t = new Date().toDateString(); var c = 0; d.log.forEach(function(e) { if (e.date === t) c++; }); return c >= 5; } },
        { id: 'morning_momentum', text: 'Complete 2 actions before 10 AM', xp: 35, emoji: '🌅',
          check: function(d) { var t = new Date().toDateString(); var c = 0; d.log.forEach(function(e) { if (e.date === t) { try { var h = parseInt(e.time.split(':')[0]); if (h < 10) c++; } catch(x) {} } }); return c >= 2; } },
        { id: 'deep_work', text: 'Spend 45+ minutes on a single action', xp: 40, emoji: '🧘',
          check: function(d) { return d.log.some(function(e) { return e.date === new Date().toDateString() && e.actualMinutes && e.actualMinutes >= 45; }); } }
    ];

    function getDailyChallenges() {
        var dateKey = 'lwp_challenges_' + new Date().toDateString();
        var saved = localStorage.getItem(dateKey);
        if (saved) {
            try { return JSON.parse(saved); } catch(e) {}
        }
        // Generate 3 random challenges using date as seed
        var dateStr = new Date().toDateString();
        var seed = 0;
        for (var i = 0; i < dateStr.length; i++) seed += dateStr.charCodeAt(i);
        var pool = CHALLENGE_POOL.slice();
        var picked = [];
        for (var j = 0; j < 3 && pool.length > 0; j++) {
            var idx = (seed * (j + 7) + j * 13) % pool.length;
            picked.push({ id: pool[idx].id, completed: false });
            pool.splice(idx, 1);
        }
        localStorage.setItem(dateKey, JSON.stringify(picked));
        return picked;
    }

    function checkDailyChallenges() {
        if (!data) return [];
        var challenges = getDailyChallenges();
        var newlyCompleted = [];
        challenges.forEach(function(ch) {
            if (ch.completed) return;
            var def = CHALLENGE_POOL.find(function(c) { return c.id === ch.id; });
            if (def && def.check(data)) {
                ch.completed = true;
                data.totalMomentum += def.xp;
                newlyCompleted.push(def);
            }
        });
        if (newlyCompleted.length > 0) {
            var dateKey = 'lwp_challenges_' + new Date().toDateString();
            localStorage.setItem(dateKey, JSON.stringify(challenges));
        }
        return newlyCompleted;
    }

    // --- CONFETTI SYSTEM (NCI Emotion: Visual celebration anchors positive neural pathways) ---
    function launchConfetti() {
        var container = document.getElementById('confettiContainer');
        if (!container) return;
        container.innerHTML = '';
        var colors = ['#7c6fba', '#6aad99', '#c4996a'];
        for (var i = 0; i < 25; i++) {
            var piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = (Math.random() * 0.5) + 's';
            piece.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
            var size = Math.random() * 6 + 4;
            piece.style.width = size + 'px';
            piece.style.height = size + 'px';
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            container.appendChild(piece);
        }
        container.classList.remove('hidden');
        setTimeout(function() { container.classList.add('hidden'); container.innerHTML = ''; }, 3000);
    }

    // --- JOY BURST: Quick sparkle on every task completion ---
    function joyBurst() {
        var card = document.getElementById('nextActionCard');
        if (!card) return;
        var joyEmojis = ['\u2728', '\uD83C\uDF1F', '\uD83D\uDCAB', '\u2B50', '\uD83C\uDF89', '\uD83C\uDF8A', '\uD83D\uDE80', '\uD83D\uDC9B', '\uD83C\uDF08', '\uD83E\uDD29'];
        for (var i = 0; i < 6; i++) {
            var spark = document.createElement('div');
            spark.className = 'joy-burst-particle';
            spark.textContent = joyEmojis[Math.floor(Math.random() * joyEmojis.length)];
            spark.style.left = (20 + Math.random() * 60) + '%';
            spark.style.animationDelay = (Math.random() * 0.3) + 's';
            spark.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
            card.appendChild(spark);
        }
        setTimeout(function() {
            var particles = card.querySelectorAll('.joy-burst-particle');
            for (var j = 0; j < particles.length; j++) particles[j].remove();
        }, 1200);
    }

    function showLevelUpOverlay(level) {
        var overlay = document.getElementById('levelUpOverlay');
        if (!overlay) return;
        document.getElementById('levelUpEmoji').textContent = level.current.emoji;
        document.getElementById('levelUpTitle').textContent = level.current.title;
        document.getElementById('levelUpMsg').textContent = level.current.msg;
        overlay.classList.remove('hidden');
        launchConfetti();
        setTimeout(function() { overlay.classList.add('hidden'); }, 5000);
    }

    function showBadgeUnlockOverlay(badge) {
        var overlay = document.getElementById('badgeUnlockOverlay');
        if (!overlay) return;
        document.getElementById('badgeUnlockEmoji').textContent = badge.emoji;
        document.getElementById('badgeUnlockName').textContent = badge.name;
        document.getElementById('badgeUnlockDesc').textContent = badge.desc + ' — +' + badge.xp + ' XP!';
        overlay.classList.remove('hidden');
        launchConfetti();
        setTimeout(function() { overlay.classList.add('hidden'); }, 4000);
    }

    function showChallengeCompleteToast(challenge) {
        var toast = document.getElementById('challengeToast');
        if (!toast) return;
        document.getElementById('challengeToastText').textContent = challenge.emoji + ' ' + challenge.text + ' — +' + challenge.xp + ' XP!';
        toast.classList.remove('hidden');
        toast.classList.add('toast-animate');
        setTimeout(function() {
            toast.classList.add('hidden');
            toast.classList.remove('toast-animate');
        }, 3500);
    }

    // --- WEEKLY POWER SCORE (NCI Tribe: Competing with past self = internal tribe authority) ---
    function calculateWeeklyPowerScore(weekOffset) {
        // weekOffset: 0 = current week, 1 = last week, etc.
        var now = new Date();
        var startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay() - (weekOffset * 7));
        startOfWeek.setHours(0, 0, 0, 0);
        var endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7);

        var actions = 0;
        var categories = {};
        data.log.forEach(function(entry) {
            var entryDate = new Date(entry.date);
            if (entryDate >= startOfWeek && entryDate < endOfWeek) {
                // Always count ALL categories (no filter applied)
                actions++;
                if (entry.category) categories[entry.category] = true;
            }
        });

        var streakDays = Math.min(7, data.streak);
        var challengesKey = 'lwp_weekly_challenges_' + startOfWeek.toDateString();
        var challengesCompleted = 0;
        try {
            var saved = localStorage.getItem(challengesKey);
            if (saved) challengesCompleted = parseInt(saved) || 0;
        } catch(e) {}

        // Only include comboCount for current week (weekOffset 0), not historical weeks
        var comboBonus = weekOffset === 0 ? (comboCount * 5) : 0;
        var score = (actions * 10) + comboBonus + (streakDays * 15) + (challengesCompleted * 25) + (Object.keys(categories).length * 10);
        return { score: score, actions: actions, categories: Object.keys(categories).length, streakDays: streakDays };
    }

    function getWeeklyScoreHistory() {
        var history = [];
        for (var i = 0; i < 4; i++) {
            history.push(calculateWeeklyPowerScore(i));
        }
        return history;
    }

    // --- NCI AUTHORITY NUDGES (Behavioral identity reinforcement messages) ---
    const NCI_AUTHORITY_NUDGES = [
        "You are becoming the authority in your own life.",
        "Discipline is prioritizing the needs of your future self. You just did that.",
        "Every action you take builds your internal authority. People follow those who follow through.",
        "Confidence comes from kept promises. You just kept one to yourself.",
        "The five pillars of authority: confidence, discipline, leadership, gratitude, enjoyment. You're building all five.",
        "Focus creates authority. Authority creates compliance. Your focus just leveled up.",
        "You took the lead. That's what champions do.",
        "Your brain just recorded this win. It's rewiring for more success.",
        "Expectancy drives behavior. Expect more from yourself — you just proved you can deliver.",
        "The strongest form of influence is self-influence. You just exercised it."
    ];

    // --- RENDER GAMIFICATION UI ---
    function renderLevelBadge() {
        var el = document.getElementById('levelBadge');
        if (!el || !data) return;
        var level = getLevel(data.totalMomentum);
        el.innerHTML = '<span class="level-emoji">' + level.current.emoji + '</span>' +
            '<span class="level-title">' + level.current.title + '</span>';
    }

    function renderCombo() {
        var el = document.getElementById('comboDisplay');
        if (!el) return;
        if (comboCount >= 2) {
            var mult = getComboMultiplier(comboCount);
            el.innerHTML = '<span class="combo-fire">🔥</span> COMBO x' + comboCount + ' <span class="combo-mult">' + mult + 'x</span>';
            el.classList.remove('hidden');
            el.classList.add('combo-pulse');
            setTimeout(function() { el.classList.remove('combo-pulse'); }, 600);
        } else {
            el.classList.add('hidden');
        }
    }

    function renderDailyChallenges() {
        var container = document.getElementById('dailyChallengesContainer');
        if (!container) return;
        var challenges = getDailyChallenges();
        var html = '';
        challenges.forEach(function(ch) {
            var def = CHALLENGE_POOL.find(function(c) { return c.id === ch.id; });
            if (!def) return;
            var cls = ch.completed ? 'challenge-card completed' : 'challenge-card';
            html += '<div class="' + cls + '">' +
                '<span class="challenge-emoji">' + def.emoji + '</span>' +
                '<div class="challenge-info">' +
                    '<div class="challenge-text">' + def.text + '</div>' +
                    '<div class="challenge-xp">+' + def.xp + ' XP</div>' +
                '</div>' +
                '<span class="challenge-status">' + (ch.completed ? '✅' : '⬜') + '</span>' +
            '</div>';
        });
        container.innerHTML = html;
    }

    function renderBadgesGrid() {
        var container = document.getElementById('badgesGrid');
        if (!container || !data) return;
        migrateBadges();

        // Build badge items with sort data
        var items = BADGE_DEFINITIONS.map(function(badge) {
            var entry = getBadgeEntry(badge.id);
            var active = entry && isBadgeActive(entry, badge);
            var everEarned = !!entry;
            var count = entry ? (entry.count || 1) : 0;
            return { badge: badge, entry: entry, active: active, everEarned: everEarned, count: count };
        });

        // Sort: active today/this week first, then permanent earned, then locked
        items.sort(function(a, b) {
            if (a.active && !b.active) return -1;
            if (!a.active && b.active) return 1;
            if (a.everEarned && !b.everEarned) return -1;
            if (!a.everEarned && b.everEarned) return 1;
            return 0;
        });

        var typeLabels = { daily: 'DAILY', weekly: 'WEEKLY', permanent: '' };
        var typeColors = { daily: '#6aad99', weekly: '#6a9dba', permanent: '#7c6fba' };

        var html = '';
        items.forEach(function(item) {
            var badge = item.badge;
            var cls, stateLabel;
            if (item.active) {
                cls = 'badge-item earned';
                stateLabel = '';
            } else if (item.everEarned && badge.type !== 'permanent') {
                cls = 'badge-item faded';
                stateLabel = '<span class="badge-again">earn again</span>';
            } else if (item.everEarned) {
                cls = 'badge-item earned';
                stateLabel = '';
            } else {
                cls = 'badge-item locked';
                stateLabel = '';
            }

            var xpLabel = item.active ? '<span class="badge-xp earned">+' + badge.xp + ' XP</span>' : '<span class="badge-xp">' + badge.xp + ' XP</span>';
            var typeBadge = badge.type !== 'permanent' ? '<span class="badge-type" style="color:' + typeColors[badge.type] + '">' + typeLabels[badge.type] + '</span>' : '';
            var countLabel = item.count > 1 ? '<span class="badge-count">x' + item.count + '</span>' : '';

            html += '<div class="' + cls + '" title="' + badge.desc + '">' +
                typeBadge +
                '<span class="badge-emoji">' + (item.active || (item.everEarned && badge.type === 'permanent') ? badge.emoji : '🔒') + '</span>' +
                countLabel +
                '<span class="badge-name">' + badge.name + '</span>' +
                xpLabel +
                stateLabel +
            '</div>';
        });
        container.innerHTML = html;
    }

    function renderWeeklyPowerScore() {
        var container = document.getElementById('weeklyPowerContainer');
        var container2 = document.getElementById('weeklyPowerContainer2');
        if (!container && !container2) return;
        if (!isProUser()) {
            var lockedHtml = '<div style="text-align:center;padding:8px;opacity:0.5;font-size:0.75rem"><span>\u{1F512}</span> Weekly Power Score <span class="pro-lock-badge">PRO</span></div>';
            if (container) container.innerHTML = lockedHtml;
            if (container2) container2.innerHTML = lockedHtml;
            return;
        }
        var history = getWeeklyScoreHistory();
        var current = history[0];
        var last = history[1];

        // Comparison badge (only show if last week had real actions)
        var comparison = '';
        if (last.score > 0 && last.actions > 0 && current.score > last.score) {
            comparison = '<span class="pwr-stat pwr-stat-beat">&#128293; Beating last week!</span>';
        } else if (last.score > 0 && last.actions > 0 && last.score > current.score) {
            comparison = '<span class="pwr-stat pwr-stat-chase">&#9650; ' + (last.score - current.score) + ' to beat last wk</span>';
        }

        // Mini trend bars
        var maxScore = Math.max.apply(null, history.map(function(h) { return h.score; })) || 1;
        var bars = '';
        for (var i = history.length - 1; i >= 0; i--) {
            var pct = Math.max(8, Math.round((history[i].score / maxScore) * 100));
            var act = i === 0 ? ' pwr-active' : '';
            bars += '<div class="pwr-mini-bar' + act + '" style="height:' + pct + '%" title="' + history[i].score + ' pts"></div>';
        }

        // Best combo today
        var comboStat = '';
        if (comboCount >= 2) {
            comboStat = '<span class="pwr-stat pwr-stat-combo">&#128293; x' + comboCount + ' combo</span>';
        }

        // Build Power Score bar HTML (stats only, no POWER header or mini chart)
        var pwrBarHtml = '<div class="pwr-bar pwr-bar-full">' +
            '<div class="pwr-stats-row">' +
                '<span class="pwr-stat pwr-stat-actions">&#9989; ' + current.actions + ' actions</span>' +
                '<span class="pwr-stat pwr-stat-cats">&#127752; ' + current.categories + ' categories</span>' +
                '<span class="pwr-stat pwr-stat-streak">&#128293; ' + current.streakDays + 'd streak</span>' +
                comboStat +
                comparison +
            '</div>' +
        '</div>';

        // Render to both containers (main area + Action Log)
        if (container) container.innerHTML = '<div class="pwr-context-main">' + pwrBarHtml + '</div>';
        if (container2) container2.innerHTML = '<div class="pwr-context-log">' + pwrBarHtml + '</div>';
    }

    // ==========================================
    //  AUDIO PRAISE SYSTEM (real audio files)
    // ==========================================
    var CELEBRATION_SOUNDS = [
        { file: 'audio/success-1.mp3', name: 'Success' },
        { file: 'audio/achievement-bell.mp3', name: 'Achievement Bell' },
        { file: 'audio/unlock.mp3', name: 'Unlock' },
        { file: 'audio/quick-win.mp3', name: 'Quick Win' },
        { file: 'audio/bonus-collect.mp3', name: 'Bonus' },
        { file: 'audio/winning-chimes.mp3', name: 'Winning Chimes' },
        { file: 'audio/payout.mp3', name: 'Payout' },
        { file: 'audio/applause-1.mp3', name: 'Applause' },
        { file: 'audio/applause-2.mp3', name: 'Applause 2' },
        { file: 'audio/cheer.mp3', name: 'Cheer' }
    ];

    // Preload audio for instant playback
    var preloadedAudio = [];
    function preloadCelebrationSounds() {
        CELEBRATION_SOUNDS.forEach(function(s) {
            var audio = new Audio();
            audio.preload = 'auto';
            audio.src = s.file;
            audio.volume = 0.6;
            preloadedAudio.push(audio);
        });
    }

    // Track last played to avoid repeats
    var lastPlayedIdx = -1;

    function playCompletionAudio() {
        try {
            if (preloadedAudio.length === 0) return;
            // Pick random sound, avoiding repeat
            var idx;
            do {
                idx = Math.floor(Math.random() * preloadedAudio.length);
            } while (idx === lastPlayedIdx && preloadedAudio.length > 1);
            lastPlayedIdx = idx;

            var audio = preloadedAudio[idx];
            audio.currentTime = 0;
            audio.volume = 0.6;
            var playPromise = audio.play();
            if (playPromise) {
                playPromise.catch(function() {
                    // Autoplay blocked - silently skip
                });
            }
        } catch(e) {
            console.log('Audio praise skipped:', e.message);
        }
    }

    // Master function called after each completion
    function processGamification(wasOverdue) {
        if (!data) return;
        // Track overdue flag for badge check
        data._justCompletedOverdue = wasOverdue || false;

        var prevLevel = getLevel(data.totalMomentum - 15); // approximate pre-points level

        // 1. Update combo
        var combo = updateCombo();
        var multiplier = getComboMultiplier(combo);

        // 2. Apply combo bonus (extra points on top of base)
        if (multiplier > 1) {
            var basePoints = 15; // approximate
            var bonusPoints = Math.round(basePoints * (multiplier - 1));
            data.totalMomentum += bonusPoints;
            // Update last log entry with combo info
            if (data.log.length > 0) {
                data.log[data.log.length - 1].comboBonus = bonusPoints;
                data.log[data.log.length - 1].comboLevel = combo;
            }
        }

        // 3. Check for level up
        var newLevel = getLevel(data.totalMomentum);
        if (newLevel.index > prevLevel.index) {
            setTimeout(function() { showLevelUpOverlay(newLevel); }, 800);
        }

        // 4. Check badges
        var newBadges = checkBadges();
        if (newBadges.length > 0) {
            var delay = newLevel.index > prevLevel.index ? 5500 : 800;
            newBadges.forEach(function(badge, i) {
                setTimeout(function() { showBadgeUnlockOverlay(badge); }, delay + (i * 4500));
            });
        }

        // 4b. Post-badge upgrade nudge (30% chance, free users only, weekly/permanent badges)
        if (newBadges.length > 0 && !isProUser()) {
            var hasAdvancedBadge = newBadges.some(function(b) { return b.type === 'weekly' || b.type === 'permanent'; });
            if (hasAdvancedBadge && Math.random() < 0.3) {
                var nudgeDelay = (newLevel.index > prevLevel.index ? 5500 : 800) + (newBadges.length * 4500) + 1000;
                setTimeout(function() {
                    showUpgradeNudge('All Badges');
                }, nudgeDelay);
            }
        }

        // 5. Check daily challenges
        var completedChallenges = checkDailyChallenges();
        completedChallenges.forEach(function(ch, i) {
            setTimeout(function() { showChallengeCompleteToast(ch); }, 500 + (i * 4000));
        });

        // Track weekly challenges count
        try {
            var weekStart = new Date();
            weekStart.setDate(weekStart.getDate() - weekStart.getDay());
            weekStart.setHours(0, 0, 0, 0);
            var wKey = 'lwp_weekly_challenges_' + weekStart.toDateString();
            var wCount = parseInt(localStorage.getItem(wKey) || '0');
            wCount += completedChallenges.length;
            localStorage.setItem(wKey, JSON.stringify(wCount));
        } catch(e) {}

        // 6. Clean up
        delete data._justCompletedOverdue;

        // 7. Render all gamification UI
        renderLevelBadge();
        renderCombo();
        renderDailyChallenges();
        renderBadgesGrid();
        renderWeeklyPowerScore();
    }

    // ==========================================
    //  MOTIVATIONAL QUOTES
    // ==========================================
    const MOTIVATION_QUOTES = [
        // Tony Robbins
        { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
        { text: "It's not about the goal. It's about becoming the type of person that can accomplish the goal.", author: "Tony Robbins" },
        { text: "Where focus goes, energy flows.", author: "Tony Robbins" },
        { text: "The path to success is to take massive, determined action.", author: "Tony Robbins" },
        { text: "Setting goals is the first step in turning the invisible into the visible.", author: "Tony Robbins" },
        { text: "When you are grateful, fear disappears and abundance appears.", author: "Tony Robbins" },
        // Elon Musk
        { text: "When something is important enough, you do it even if the odds are not in your favor.", author: "Elon Musk" },
        { text: "I think it's possible for ordinary people to choose to be extraordinary.", author: "Elon Musk" },
        { text: "Persistence is very important. You should not give up unless you are forced to give up.", author: "Elon Musk" },
        // Steve Jobs
        { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
        { text: "The people who are crazy enough to think they can change the world are the ones who do.", author: "Steve Jobs" },
        // Paulo Coelho
        { text: "When you want something, all the universe conspires in helping you to achieve it.", author: "Paulo Coelho" },
        { text: "There is only one thing that makes a dream impossible to achieve: the fear of failure.", author: "Paulo Coelho" },
        { text: "The secret of life is to fall seven times and to get up eight times.", author: "Paulo Coelho" },
        { text: "One day you will wake up and there won't be any more time to do the things you've always wanted.", author: "Paulo Coelho" },
        // Buddha
        { text: "The mind is everything. What you think you become.", author: "Buddha" },
        { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha" },
        { text: "What we think, we become.", author: "Buddha" },
        { text: "The only real failure in life is not to be true to the best one knows.", author: "Buddha" },
        // Marisa Peer
        { text: "Your thoughts form your reality. Change your thoughts and you change your world.", author: "Marisa Peer" },
        { text: "The strongest force in the human personality is the need to stay consistent with how we define ourselves.", author: "Marisa Peer" },
        { text: "You are enough. You always have been and you always will be.", author: "Marisa Peer" },
        { text: "The way you feel about yourself is the way the world will feel about you.", author: "Marisa Peer" },
        // Michael A. Singer
        { text: "Only you can take inner freedom away from yourself, or give it to yourself.", author: "Michael A. Singer" },
        { text: "The truth is, everything will be okay as soon as you are okay with everything.", author: "Michael A. Singer" },
        { text: "You are not the voice of the mind — you are the one who hears it.", author: "Michael A. Singer" },
        { text: "The highest spiritual path is life itself.", author: "Michael A. Singer" },
        // Nikola Tesla
        { text: "The present is theirs; the future, for which I really worked, is mine.", author: "Nikola Tesla" },
        { text: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.", author: "Nikola Tesla" },
        { text: "I do not think there is any thrill that can go through the human heart like that felt by the inventor.", author: "Nikola Tesla" },
        // Nelson Mandela
        { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
        { text: "I never lose. I either win or learn.", author: "Nelson Mandela" },
        { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
        { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
        // Women Leaders & Thinkers
        { text: "Done is better than perfect.", author: "Sheryl Sandberg" },
        { text: "You can have it all. Just not all at once.", author: "Oprah Winfrey" },
        { text: "The biggest adventure you can take is to live the life of your dreams.", author: "Oprah Winfrey" },
        { text: "Think like a queen. A queen is not afraid to fail.", author: "Oprah Winfrey" },
        { text: "Life shrinks or expands in proportion to one's courage.", author: "Anaïs Nin" },
        { text: "I am not afraid of storms, for I am learning how to sail my ship.", author: "Louisa May Alcott" },
        { text: "The question isn't who is going to let me; it's who is going to stop me.", author: "Ayn Rand" },
        { text: "We can do no great things, only small things with great love.", author: "Mother Teresa" },
        { text: "You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.", author: "Eleanor Roosevelt" },
        { text: "No one can make you feel inferior without your consent.", author: "Eleanor Roosevelt" },
        { text: "The most common way people give up their power is by thinking they don't have any.", author: "Alice Walker" },
        { text: "Success is liking yourself, liking what you do, and liking how you do it.", author: "Maya Angelou" },
        { text: "There is no greater agony than bearing an untold story inside you.", author: "Maya Angelou" },
        // Classic Wisdom
        { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
        { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
        { text: "Don't wish it were easier. Wish you were better.", author: "Jim Rohn" },
        { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
        // ADHD-Specific Quotes — Doctors, Researchers & ADHD Advocates
        { text: "ADHD is not about knowing what to do, but about doing what you know.", author: "Dr. Russell Barkley" },
        { text: "People with ADHD are the inventors, the explorers, the ones who see what others miss.", author: "Dr. Edward Hallowell" },
        { text: "Your brain is not broken. It's a Ferrari engine with bicycle brakes.", author: "Dr. Edward Hallowell" },
        { text: "ADHD is not a deficit of attention. It's a challenge of regulating attention.", author: "Dr. Russell Barkley" },
        { text: "The secret to getting ahead is getting started. The secret to getting started is breaking your overwhelming task into small manageable tasks.", author: "Mark Twain" },
        { text: "You don't have to see the whole staircase, just take the first step.", author: "Martin Luther King Jr." },
        { text: "Progress, not perfection, is what we should be asking of ourselves.", author: "Julia Cameron" },
        { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
        { text: "You are not your diagnosis. You are not your struggles. You are the person who keeps showing up despite them.", author: "ADHD Community" },
        { text: "Having ADHD means your brain works differently, not deficiently.", author: "Dr. Ned Hallowell" },
        { text: "Imperfect action beats perfect inaction every single time.", author: "Harry Truman" },
        { text: "If you judge a fish by its ability to climb a tree, it will live its whole life believing it is stupid.", author: "Albert Einstein" },
        { text: "Your value doesn't decrease based on someone's inability to see your worth.", author: "ADHD Affirmation" },
        { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
        { text: "Every expert was once a beginner who refused to give up.", author: "Helen Hayes" },
        { text: "The ADHD brain is a powerful machine. The challenge is learning to drive it.", author: "Dr. Ari Tuckman" },
        { text: "You have survived 100% of your worst days. That's a pretty good track record.", author: "ADHD Affirmation" },
        { text: "Rest is not the opposite of productivity. It's the foundation of it.", author: "Alex Soojung-Kim Pang" },
        { text: "A small step in the right direction is better than a big step in the wrong direction.", author: "ADHD Wisdom" },
        { text: "Your brain craves novelty. That's not a bug — that's your superpower for creativity.", author: "Dr. Hallowell" },
        { text: "Motivation follows action. Don't wait to feel ready — just start.", author: "Dr. Russell Barkley" },
        { text: "You're not lazy. You're not stupid. You're not broken. Your brain just has a different operating system.", author: "Jessica McCabe" },
        { text: "The only person you should try to be better than is the person you were yesterday.", author: "ADHD Coaching" },
        { text: "Messy progress is still progress.", author: "ADHD Affirmation" },
        { text: "Every challenge you face is proof of how strong you are. You keep showing up.", author: "ADHD Community" },
        { text: "Your only measuring stick is who you were yesterday. Your brain runs its own beautiful race.", author: "ADHD Wisdom" },
        { text: "Done is better than perfect. Shipped is better than polished. Started is better than planned.", author: "ADHD Coaching" },
        { text: "The ADHD mind is like a web browser with 100 tabs open. Close a few. Bookmark the rest.", author: "ADHD Community" },
        { text: "The right systems will unlock everything. Build tools that work with your brain, and watch yourself fly.", author: "ADHD Coaching" },
        { text: "Some of the most brilliant minds in history had ADHD. You're in good company.", author: "Dr. Hallowell" },
        { text: "Consistency means choosing to try again. Every time you restart, you level up.", author: "ADHD Affirmation" },
        { text: "You matter because of who you are, always. Your worth lives inside you, every single day.", author: "ADHD Coaching" },
        { text: "You already began. That first step is the hardest one, and you already took it.", author: "ADHD Affirmation" },
        { text: "Your brain knows exactly what lights it up. Feed it the good stuff and it will reward you.", author: "ADHD Wisdom" },
        { text: "Your brain is brilliant — it just came with its own instruction manual. You'll write it yourself.", author: "ADHD Affirmation" },
        { text: "You have 26 letters in the alphabet and an ADHD brain full of creative plans. You will find the way.", author: "ADHD Wisdom" },
        { text: "Hyperfocus is your superpower. When you lock in, you are unstoppable.", author: "ADHD Community" },
        { text: "Be patient with yourself. Self-growth is tender; it's holy ground.", author: "Stephen Covey" },
        { text: "Fall seven times, stand up eight. That's the ADHD way.", author: "Japanese Proverb" },
        { text: "The way you speak to yourself matters more than any productivity hack.", author: "ADHD Coaching" },
        { text: "Your energy is currency. Spend it on things that matter to you.", author: "ADHD Wisdom" },
        { text: "Celebrate every day you showed up. Those days are building the life you deserve.", author: "ADHD Affirmation" },
        { text: "ADHD gives you a unique lens on the world. That perspective has value.", author: "Dr. Hallowell" },
        { text: "Build a life that fits how your brain actually works, and everything starts flowing.", author: "ADHD Coaching" },
        { text: "Be kind to yourself. Your brain is working behind the scenes, sorting through a world of possibilities.", author: "ADHD Affirmation" },
        { text: "Rest is fuel for brilliance. Give yourself permission to recharge — you deserve it.", author: "ADHD Wisdom" },
        { text: "Small wins build big momentum. Celebrate every single one.", author: "ADHD Coaching" },
        { text: "You are allowed to be both a masterpiece and a work in progress simultaneously.", author: "Sophia Bush" },
        { text: "Your ambition is massive. Give it the right scaffolding and you will build something amazing.", author: "ADHD Coaching" },
        { text: "Your best looks different every day, and every version of your best is enough.", author: "ADHD Affirmation" },
        { text: "Your brain experiences time in its own way. Build smart systems around it and you win.", author: "ADHD Coaching" },
        { text: "You are creative, passionate, and full of ideas. The world needs exactly what you bring.", author: "ADHD Community" },
        { text: "Every task you start is a victory. Every step forward counts, no matter how small.", author: "ADHD Coaching" },
        { text: "Your brain is wired for exploration, creativity, and big-picture thinking. Lean into that.", author: "Dr. Hallowell" },
        { text: "Today's small effort compounds into tomorrow's big results.", author: "James Clear" },
        { text: "Just start. Motivation follows action, and action is already inside you.", author: "ADHD Wisdom" },
        { text: "Give yourself the same grace you give your friends. You deserve that kindness too.", author: "ADHD Coaching" },
        { text: "Every time you choose to try again, you're building resilience most people will never know.", author: "ADHD Affirmation" },
        { text: "The struggle you're in today is developing the strength you need for tomorrow.", author: "Robert Tew" },
        { text: "You can't pour from an empty cup. Taking care of yourself isn't selfish — it's strategic.", author: "ADHD Wisdom" },
        { text: "Rejection sensitivity isn't weakness. It means you feel deeply. That's also your greatest strength.", author: "ADHD Community" },
        { text: "You've been criticizing yourself for years and it hasn't worked. Try approving of yourself and see what happens.", author: "Louise Hay" },
        { text: "Your potential is not defined by your executive function. It's defined by your heart.", author: "ADHD Affirmation" },
        { text: "The dishes can wait. The email can wait. But your mental health can't. Take the break.", author: "ADHD Coaching" },
        { text: "Structure isn't a cage. For the ADHD brain, it's a launchpad.", author: "Dr. Hallowell" },
        { text: "A bad hour doesn't make a bad day. A bad day doesn't make a bad life. Keep going.", author: "ADHD Affirmation" },
        { text: "The fact that you're trying, right now, in this moment — that already makes you exceptional.", author: "ADHD Coaching" },
        { text: "Neurodivergent brains built the pyramids, painted the Sistine Chapel, and put humans on the moon.", author: "ADHD History" },
        { text: "You are not behind. You are on your own path, at your own pace, and that is perfectly okay.", author: "ADHD Affirmation" }
    ];

    // ==========================================
    //  SECURITY: ENCRYPTION HELPERS (AES-GCM)
    // ==========================================
    async function deriveEncryptionKey(uid) {
        var encoder = new TextEncoder();
        var keyMaterial = await crypto.subtle.importKey(
            'raw', encoder.encode(uid + '_lwp_salt_2024'),
            { name: 'PBKDF2' }, false, ['deriveKey']
        );
        return crypto.subtle.deriveKey(
            { name: 'PBKDF2', salt: encoder.encode('life_with_purpose'), iterations: 100000, hash: 'SHA-256' },
            keyMaterial,
            { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']
        );
    }

    async function encryptData(plaintext, uid) {
        try {
            var key = await deriveEncryptionKey(uid);
            var encoder = new TextEncoder();
            var iv = crypto.getRandomValues(new Uint8Array(12));
            var encrypted = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv: iv }, key, encoder.encode(plaintext)
            );
            // Store as base64: iv + ciphertext
            var combined = new Uint8Array(iv.length + encrypted.byteLength);
            combined.set(iv);
            combined.set(new Uint8Array(encrypted), iv.length);
            return btoa(String.fromCharCode.apply(null, combined));
        } catch (e) {
            console.error('Encryption error:', e);
            return null;
        }
    }

    async function decryptData(ciphertext, uid) {
        try {
            var key = await deriveEncryptionKey(uid);
            var raw = Uint8Array.from(atob(ciphertext), function(c) { return c.charCodeAt(0); });
            var iv = raw.slice(0, 12);
            var data = raw.slice(12);
            var decrypted = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: iv }, key, data
            );
            return new TextDecoder().decode(decrypted);
        } catch (e) {
            console.error('Decryption error:', e);
            return null;
        }
    }

    // (PIN and session lock removed — Google login is sufficient)

    // ==========================================
    //  AUTH & USER STATE
    // ==========================================
    var currentUser = null;
    var isOfflineMode = false;
    var firestoreUnsubscribe = null;
    var userTier = 'free'; // 'free', 'starter', 'pro', or 'founding'

    var TIER_ALLOWED_MODES = {
        free: ['personal'],
        starter: ['personal', 'health'],
        pro: ['personal', 'business', 'health', 'finances'],
        founding: ['personal', 'business', 'health', 'finances']
    };

    function canAccessMode(mode) {
        if (isFoundingMember || isTrialUser) return true;
        var allowed = TIER_ALLOWED_MODES[userTier] || TIER_ALLOWED_MODES.free;
        return allowed.indexOf(mode) !== -1;
    }

    function hasUnlimitedOutcomes() {
        return userTier !== 'free' || isFoundingMember || isTrialUser;
    }

    // ==========================================
    //  PRO TIER SYSTEM
    // ==========================================
    var PRO_FEATURES = {
        business_mode: { name: 'Business Mode', desc: 'Track business goals across 6 categories' },
        unlimited_outcomes: { name: 'Unlimited Outcomes', desc: 'Create as many goals as you need' },
        all_badges: { name: 'All Badges', desc: 'Unlock weekly & permanent achievement badges' },
        combo: { name: 'Combo Multiplier', desc: 'Earn up to 3x points for back-to-back actions' },
        rituals: { name: 'Daily Rituals', desc: 'Power Priming, Evening Seed & Wind Down' },
        focus_timer: { name: 'Focus Sprint', desc: '15-minute focused work timer' },
        task_timer: { name: 'Task Timer', desc: 'Track time spent on each action' },
        weekly_review: { name: 'Weekly Review', desc: 'Reflect on wins and plan ahead' },
        pick_for_me: { name: 'Pick for Me', desc: 'AI-powered task selection by available time' },
        wheel: { name: 'Wheel of Life', desc: 'Visual radar chart of life balance' },
        values: { name: 'Values System', desc: 'Define core values to align your actions' },
        archive: { name: 'Archive', desc: 'View completed outcomes and history' },
        export: { name: 'Data Export', desc: 'Download your tasks and progress' },
        tomorrow: { name: 'Tomorrow\'s Plan', desc: 'Preview and plan tomorrow\'s focus' },
        power_score: { name: 'Weekly Power Score', desc: 'Detailed stats and trend analysis' }
    };

    function isProUser() {
        return userTier === 'pro' || userTier === 'starter' || userTier === 'founding' || isFoundingMember || isTrialUser;
    }

    function isTrialUser() {
        return isOfflineMode && !isDemoExpired();
    }

    function requirePro(featureId) {
        if (isProUser()) return true;
        var feature = PRO_FEATURES[featureId] || { name: 'This feature', desc: '' };
        showUpgradeNudge(feature.name);
        return false;
    }

    function showUpgradeNudge(featureName) {
        var banner = document.getElementById('praiseBanner');
        var text = document.getElementById('praiseText');
        if (!banner || !text) return;
        text.innerHTML = '<span style="cursor:pointer" onclick="document.getElementById(\'upgradeOverlay\').classList.remove(\'hidden\')">\u{1F512} ' + featureName + ' is a Pro feature &mdash; <strong style="text-decoration:underline">Upgrade \u2192</strong></span>';
        banner.classList.remove('hidden');
        banner.classList.add('praise-animate');
        banner.style.pointerEvents = 'auto';
        setTimeout(function() {
            banner.classList.add('praise-fade-out');
            setTimeout(function() {
                banner.classList.add('hidden');
                banner.classList.remove('praise-animate', 'praise-fade-out');
                banner.style.pointerEvents = '';
            }, 800);
        }, 6000);
    }

    function showMilestoneNudge(message) {
        var banner = document.getElementById('praiseBanner');
        var text = document.getElementById('praiseText');
        if (!banner || !text) return;
        text.innerHTML = '<span style="cursor:pointer" onclick="document.getElementById(\'upgradeOverlay\').classList.remove(\'hidden\')">' + message + ' &mdash; <strong style="text-decoration:underline">Upgrade \u2192</strong></span>';
        banner.classList.remove('hidden');
        banner.classList.add('praise-animate');
        banner.style.pointerEvents = 'auto';
        setTimeout(function() {
            banner.classList.add('praise-fade-out');
            setTimeout(function() {
                banner.classList.add('hidden');
                banner.classList.remove('praise-animate', 'praise-fade-out');
                banner.style.pointerEvents = '';
            }, 800);
        }, 7000);
    }

    function showUpgradeModal() {
        var overlay = document.getElementById('upgradeOverlay');
        if (overlay) overlay.classList.remove('hidden');
    }

    function updateUpgradeButtonVisibility() {
        var btn = document.getElementById('btnUpgrade');
        if (!btn) return;
        if (currentUser && !isOfflineMode && userTier === 'free' && !isFoundingMember && !isTrialUser) {
            btn.style.display = 'inline-flex';
        } else {
            btn.style.display = 'none';
        }
        updateCheckoutLinks();
    }

    var CHECKOUT_URLS = {
        starter_monthly: 'https://myhabitmagic.lemonsqueezy.com/checkout/buy/STARTER_MONTHLY_PLACEHOLDER',
        starter_annual: 'https://myhabitmagic.lemonsqueezy.com/checkout/buy/STARTER_ANNUAL_PLACEHOLDER',
        pro_monthly: 'https://myhabitmagic.lemonsqueezy.com/checkout/buy/PRO_MONTHLY_PLACEHOLDER',
        pro_annual: 'https://myhabitmagic.lemonsqueezy.com/checkout/buy/PRO_ANNUAL_PLACEHOLDER'
    };

    function updateCheckoutLinks() {
        var isAnnual = document.getElementById('billingToggle') && document.getElementById('billingToggle').checked;
        var starterLink = document.getElementById('starterCheckoutLink');
        var proLink = document.getElementById('proCheckoutLink');
        var baseStarter = isAnnual ? CHECKOUT_URLS.starter_annual : CHECKOUT_URLS.starter_monthly;
        var basePro = isAnnual ? CHECKOUT_URLS.pro_annual : CHECKOUT_URLS.pro_monthly;
        var params = '';
        if (currentUser) {
            params = '?checkout[custom][uid]=' + encodeURIComponent(currentUser.uid);
            if (currentUser.email) {
                params += '&checkout[email]=' + encodeURIComponent(currentUser.email);
            }
        }
        if (starterLink) starterLink.href = baseStarter + params;
        if (proLink) proLink.href = basePro + params;
    }

    function showPricingModal(lockedMode) {
        var overlay = document.getElementById('upgradeOverlay');
        if (!overlay) return;
        var subtitle = document.getElementById('pricingSubtitle');
        if (subtitle && lockedMode) {
            var modeNames = { business: 'Business', health: 'Health', finances: 'Finances' };
            subtitle.textContent = 'Upgrade to unlock ' + (modeNames[lockedMode] || lockedMode) + ' mode';
        } else if (subtitle) {
            subtitle.textContent = 'Unlock more modes and unlimited outcomes';
        }
        updatePricingButtons();
        updateCheckoutLinks();
        overlay.classList.remove('hidden');
    }

    function updatePricingButtons() {
        var btnFree = document.getElementById('btnPlanFree');
        if (btnFree) {
            if (userTier === 'free' && !isFoundingMember && !isTrialUser) {
                btnFree.textContent = 'Current Plan';
                btnFree.disabled = true;
            } else {
                btnFree.textContent = 'Free Plan';
                btnFree.disabled = true;
            }
        }
        var starterBtn = document.getElementById('starterCheckoutLink');
        if (starterBtn) {
            if (userTier === 'starter') {
                starterBtn.textContent = 'Current Plan';
                starterBtn.style.pointerEvents = 'none';
                starterBtn.style.opacity = '0.6';
            } else {
                starterBtn.textContent = 'Get Starter \u2192';
                starterBtn.style.pointerEvents = '';
                starterBtn.style.opacity = '';
            }
        }
        var proBtn = document.getElementById('proCheckoutLink');
        if (proBtn) {
            if (userTier === 'pro') {
                proBtn.textContent = 'Current Plan';
                proBtn.style.pointerEvents = 'none';
                proBtn.style.opacity = '0.6';
            } else {
                proBtn.textContent = 'Get Pro \u2192';
                proBtn.style.pointerEvents = '';
                proBtn.style.opacity = '';
            }
        }
    }

    function updateModeLocksUI() {
        var btnIds = {
            personal: 'btnPersonalMode',
            business: 'btnBusinessMode',
            health: 'btnHealthMode',
            finances: 'btnFinancesMode'
        };
        ['personal', 'business', 'health', 'finances'].forEach(function(mode) {
            var btn = document.getElementById(btnIds[mode]);
            if (!btn) return;
            if (canAccessMode(mode)) {
                btn.classList.remove('mode-locked');
            } else {
                btn.classList.add('mode-locked');
            }
        });
        // Update mobile dropdown options
        var mobileSelect = document.getElementById('modeSelectMobile');
        if (mobileSelect) {
            Array.from(mobileSelect.options).forEach(function(opt) {
                var cleanText = opt.textContent.replace(' \uD83D\uDD12', '');
                if (!canAccessMode(opt.value)) {
                    opt.textContent = cleanText + ' \uD83D\uDD12';
                    opt.disabled = true;
                } else {
                    opt.textContent = cleanText;
                    opt.disabled = false;
                }
            });
        }
        // If current mode is locked, switch to personal
        if (!canAccessMode(currentMode)) {
            switchMode('personal');
        }
    }

    function showUpgradeModal() {
        showPricingModal();
    }

    function showLoginScreen() {
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('app').classList.add('hidden');
        var banner = document.getElementById('demoBanner');
        if (banner) banner.classList.add('hidden');
        // Load founding member count for login/landing page
        loadFoundingMemberCount(function() {
            var remaining = Math.max(0, FOUNDING_MEMBER_LIMIT - foundingMemberCount);
            var spotEls = document.querySelectorAll('.founding-spots-count');
            spotEls.forEach(function(el) { el.textContent = remaining; });

            // Update display when spots are full
            if (remaining === 0) {
                var heroSpots = document.querySelector('.hero-spots');
                if (heroSpots) {
                    heroSpots.innerHTML = '<span class="spots-full-badge">All 100 Founding Member spots are filled!</span>' +
                        '<span class="spots-full-sub">Sign up for a free 2-week trial \u2014 if a spot opens, we\u2019ll email you.</span>';
                }
                var earlySpots = document.querySelector('.early-adopter-spots');
                if (earlySpots) {
                    earlySpots.innerHTML = '<div class="spots-full-large">All 100 Spots Filled</div>' +
                        '<div class="spots-label-large">Join the waitlist for a free 2-week trial</div>';
                }
            }
        });
    }

    function showApp() {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
    }

    function updateUserUI(user) {
        var menu = document.getElementById('userMenu');
        if (user) {
            menu.style.display = 'flex';
            var avatar = document.getElementById('userAvatar');
            avatar.src = user.photoURL || '';
            avatar.alt = user.displayName || 'User';
        } else {
            menu.style.display = 'none';
        }
    }

    function googleLogin() {
        if (!firebaseReady) {
            alert('Firebase is not configured yet. See firebase-config.js for setup instructions.');
            return;
        }
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        // Try popup first, fall back to redirect if blocked
        auth.signInWithPopup(provider).catch(function(err) {
            console.error('Login error:', err);

            // Handle specific error codes
            if (err.code === 'auth/popup-blocked') {
                // Try redirect method instead
                console.log('Popup blocked, trying redirect...');
                auth.signInWithRedirect(provider);
            } else if (err.code === 'auth/popup-closed-by-user') {
                // User closed the popup - don't show error
                console.log('Login cancelled by user');
            } else if (err.code === 'auth/cancelled-popup-request') {
                // Multiple popups - ignore
                console.log('Popup request cancelled');
            } else if (err.code === 'auth/unauthorized-domain') {
                alert('This domain is not authorized for sign-in. Please add "' + window.location.hostname + '" to Firebase Console > Authentication > Settings > Authorized domains.');
            } else if (err.code === 'auth/operation-not-allowed') {
                alert('Google sign-in is not enabled. Please enable it in Firebase Console > Authentication > Sign-in method.');
            } else {
                alert('Login failed: ' + err.message);
            }
        });
    }

    // Handle redirect result (for when popup is blocked)
    function handleRedirectResult() {
        if (!firebaseReady) return;
        auth.getRedirectResult().catch(function(err) {
            if (err.code && err.code !== 'auth/popup-closed-by-user') {
                console.error('Redirect login error:', err);
                alert('Login failed: ' + err.message);
            }
        });
    }

    function logout() {
        // Clear sensitive data from memory
        data = null;
        if (auth) {
            auth.signOut();
        }
        currentUser = null;
        isOfflineMode = false;
        if (firestoreUnsubscribe) {
            firestoreUnsubscribe();
            firestoreUnsubscribe = null;
        }
        showLoginScreen();
    }

    var DEMO_EXPIRY_DAYS = 14;
    var DEMO_STARTED_KEY = 'lwp_demo_started';

    function startOfflineMode() {
        isOfflineMode = true;
        currentUser = null;
        activeStorageKey = OFFLINE_STORAGE_KEY;

        // Set demo start date if not already set
        if (!localStorage.getItem(DEMO_STARTED_KEY)) {
            localStorage.setItem(DEMO_STARTED_KEY, new Date().toISOString());
        }

        // Check if demo has expired
        if (isDemoExpired()) {
            localStorage.removeItem(OFFLINE_STORAGE_KEY);
            localStorage.removeItem(DEMO_STARTED_KEY);
            // Set fresh start date
            localStorage.setItem(DEMO_STARTED_KEY, new Date().toISOString());
        }

        showApp();
        showDemoBanner();
        init();
    }

    function isDemoExpired() {
        var started = localStorage.getItem(DEMO_STARTED_KEY);
        if (!started) return false;
        var startDate = new Date(started);
        var now = new Date();
        var diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        return diffDays >= DEMO_EXPIRY_DAYS;
    }

    function getDemoRemainingDays() {
        var started = localStorage.getItem(DEMO_STARTED_KEY);
        if (!started) return DEMO_EXPIRY_DAYS;
        var startDate = new Date(started);
        var now = new Date();
        var diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        return Math.max(0, DEMO_EXPIRY_DAYS - diffDays);
    }

    function showDemoBanner() {
        var banner = document.getElementById('demoBanner');
        if (!banner) return;
        if (isOfflineMode) {
            banner.classList.remove('hidden');
            var remaining = getDemoRemainingDays();
            var expiresEl = document.getElementById('demoExpiresIn');
            if (expiresEl) {
                expiresEl.textContent = remaining === 1 ? '1 day' : remaining + ' days';
                if (remaining <= 3) {
                    expiresEl.style.color = '#c07a73';
                    expiresEl.style.fontWeight = '800';
                }
            }
            // Progress bar fill
            var progressFill = document.getElementById('demoProgressFill');
            if (progressFill) {
                var pct = Math.max(0, (remaining / DEMO_EXPIRY_DAYS) * 100);
                progressFill.style.width = pct + '%';
                if (remaining <= 3) {
                    progressFill.style.background = '#c07a73';
                } else if (remaining <= 7) {
                    progressFill.style.background = '#c4996a';
                }
            }
            // Smart mid-trial streak nudge
            var bannerText = document.querySelector('.demo-banner-text');
            if (bannerText && data) {
                var streak = data.streak || 0;
                if (remaining <= 2) {
                    bannerText.innerHTML = '\u{23F0} <strong>Trial ends in ' + (remaining === 1 ? '1 day' : remaining + ' days') + '!</strong> Your progress disappears soon';
                } else if (remaining <= 4 && streak >= 7) {
                    bannerText.innerHTML = '\u{1F525} Your <strong>' + streak + '-day streak</strong> is epic \u2014 sign in to keep it forever!';
                } else if (remaining <= 7 && streak >= 3) {
                    bannerText.innerHTML = '\u{1F3AE} Demo Mode \u2014 <strong>' + remaining + ' days left</strong> \u2014 \u{1F525} ' + streak + '-day streak at risk!';
                }
            }
        } else {
            banner.classList.add('hidden');
        }
    }

    function exportDemoData() {
        if (!data) return;
        var exportObj = {
            appName: 'Habit Magic',
            exportDate: new Date().toISOString(),
            mode: currentMode,
            outcomes: (data.outcomes || []).map(function(o) {
                return {
                    result: o.result,
                    purpose: o.purpose,
                    category: o.category,
                    deadline: o.deadline || '',
                    actions: (o.actions || []).map(function(a) {
                        return {
                            text: a.text,
                            done: a.done,
                            deadline: a.deadline || ''
                        };
                    })
                };
            }),
            completedActions: (data.log || []).map(function(entry) {
                return {
                    action: entry.text || entry.action,
                    outcome: entry.outcome,
                    date: entry.date,
                    category: entry.category || ''
                };
            }),
            stats: {
                streak: data.streak || 0,
                bestStreak: data.bestStreak || 0,
                totalMomentum: data.totalMomentum || 0,
                totalCompleted: (data.log || []).length
            }
        };

        var jsonStr = JSON.stringify(exportObj, null, 2);
        var blob = new Blob([jsonStr], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        var dateStr = new Date().toISOString().slice(0, 10);
        a.download = 'habit-magic-backup-' + dateStr + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // ==========================================
    //  DATA MANAGEMENT
    // ==========================================
    const STORAGE_KEY_PREFIX = 'life_with_purpose_data';
    const OLD_STORAGE_KEY = 'rpm_momentum_data';
    const OFFLINE_STORAGE_KEY = 'life_with_purpose_offline';
    let activeStorageKey = OFFLINE_STORAGE_KEY; // default until user logs in
    let data = null;
    let syncTimer = null;

    function getStorageKey(uid) {
        return uid ? STORAGE_KEY_PREFIX + '_' + uid : OFFLINE_STORAGE_KEY;
    }
    let pomodoroInterval = null;
    let extendedBreakInterval = null;

    // Task Timer State
    let taskTimerInterval = null;
    let taskTimerSeconds = 0;
    let taskTimerActive = false;
    let taskCheckInInterval = null;
    let lastCheckInTime = 0;
    let currentTimerTask = { outcomeId: null, actionId: null };

    function defaultData() {
        return {
            outcomes: [],
            log: [],
            streak: 0,
            bestStreak: 0,
            lastActiveDate: null,
            totalMomentum: 0,
            sheetsUrl: '',
            sheetsToken: '',
            reflections: [],
            archived: [],
            sessionTaskCount: 0,
            extendedBreakThreshold: Math.floor(Math.random() * 2) + 4, // 4 or 5
            badges: []
        };
    }

    function loadData() {
        var raw = localStorage.getItem(activeStorageKey);
        if (!raw) {
            // Try migrating from old shared keys ONLY if no one has migrated yet
            var migrated = localStorage.getItem('lwp_migration_done');
            if (!migrated) {
                raw = localStorage.getItem('life_with_purpose_data') || localStorage.getItem(OLD_STORAGE_KEY);
                if (raw && currentUser) {
                    localStorage.removeItem('life_with_purpose_data');
                    localStorage.setItem('lwp_migration_done', '1');
                }
            }
        }
        if (raw) {
            try {
                data = JSON.parse(raw);
            } catch(e) {
                // Might be encrypted or corrupted — will try async load
                data = defaultData();
                return data;
            }
            return applyDataMigrations();
        } else {
            data = defaultData();
        }
        return data;
    }

    // Encrypted load for authenticated users
    async function loadDataEncrypted() {
        var raw = localStorage.getItem(activeStorageKey);
        if (!raw) {
            // Try old unencrypted migration ONLY if no one has migrated yet
            var migrated = localStorage.getItem('lwp_migration_done');
            if (!migrated) {
                raw = localStorage.getItem('life_with_purpose_data') || localStorage.getItem(OLD_STORAGE_KEY);
                if (raw && currentUser) {
                    // Old unencrypted data — parse it, then re-save encrypted under user key
                    try {
                        data = JSON.parse(raw);
                        localStorage.removeItem('life_with_purpose_data');
                        localStorage.setItem('lwp_migration_done', '1');
                        await saveDataEncrypted(); // re-save encrypted
                        return applyDataMigrations();
                    } catch(e) { /* fall through */ }
                }
            }
            data = defaultData();
            return data;
        }

        // Try parsing as JSON first (unencrypted legacy)
        try {
            var parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object' && parsed.outcomes !== undefined) {
                data = parsed;
                // Re-save as encrypted
                await saveDataEncrypted();
                return applyDataMigrations();
            }
        } catch(e) { /* Not JSON — try decrypting */ }

        // Try decrypting
        if (currentUser) {
            var decrypted = await decryptData(raw, currentUser.uid);
            if (decrypted) {
                try {
                    data = JSON.parse(decrypted);
                    return applyDataMigrations();
                } catch(e) {
                    console.error('Decrypted data parse error:', e);
                }
            }
        }

        data = defaultData();
        return data;
    }

    function applyDataMigrations() {
        if (data.outcomes) {
            data.outcomes.forEach(function(o) {
                // Migrate outcome category
                if (CATEGORY_MIGRATION[o.category]) {
                    o.category = CATEGORY_MIGRATION[o.category];
                }
                // Migrate each action's categories array + extraCategory
                if (o.actions) {
                    o.actions.forEach(function(a) {
                        if (a.categories && a.categories.length > 0) {
                            a.categories = a.categories.map(function(c) {
                                return CATEGORY_MIGRATION[c] || c;
                            });
                            // Remove duplicates (e.g. 'family' and 'love' both map to 'relationships')
                            a.categories = a.categories.filter(function(c, i, arr) {
                                return arr.indexOf(c) === i;
                            });
                        }
                        if (a.extraCategory && CATEGORY_MIGRATION[a.extraCategory]) {
                            a.extraCategory = CATEGORY_MIGRATION[a.extraCategory];
                        }
                        // Default estMinutes to 15 if not set
                        if (!a.estMinutes) a.estMinutes = 15;
                    });
                }
            });
        }
        // Migrate log entries
        if (data.log) {
            data.log.forEach(function(entry) {
                if (entry.category && CATEGORY_MIGRATION[entry.category]) {
                    entry.category = CATEGORY_MIGRATION[entry.category];
                }
            });
        }
        // Migrate archived outcomes
        if (data.archived) {
            data.archived.forEach(function(o) {
                if (CATEGORY_MIGRATION[o.category]) {
                    o.category = CATEGORY_MIGRATION[o.category];
                }
                if (o.actions) {
                    o.actions.forEach(function(a) {
                        if (a.categories && a.categories.length > 0) {
                            a.categories = a.categories.map(function(c) {
                                return CATEGORY_MIGRATION[c] || c;
                            });
                            a.categories = a.categories.filter(function(c, i, arr) {
                                return arr.indexOf(c) === i;
                            });
                        }
                    });
                }
            });
        }
        if (data.sessionTaskCount === undefined) data.sessionTaskCount = 0;
        if (data.extendedBreakThreshold === undefined) data.extendedBreakThreshold = Math.floor(Math.random() * 2) + 4;
        if (!data.sheetsToken) data.sheetsToken = '';
        if (!data.archived) data.archived = [];
        return data;
    }

    async function saveDataEncrypted() {
        if (currentUser && !isOfflineMode) {
            var encrypted = await encryptData(JSON.stringify(data), currentUser.uid);
            if (encrypted) {
                localStorage.setItem(activeStorageKey, encrypted);
            }
        } else {
            // Offline mode: store unencrypted (no user key)
            localStorage.setItem(activeStorageKey, JSON.stringify(data));
        }
    }

    function saveData() {
        if (currentUser && !isOfflineMode) {
            saveDataEncrypted(); // async, fire-and-forget
        } else {
            localStorage.setItem(activeStorageKey, JSON.stringify(data));
        }
        debouncedSync();
    }

    function debouncedSync() {
        if (syncTimer) clearTimeout(syncTimer);
        syncTimer = setTimeout(function() {
            saveToFirestore();
        }, 2000);
    }

    function saveToFirestore() {
        if (!firebaseReady || !currentUser || isOfflineMode) return;
        try {
            db.collection('users').doc(currentUser.uid).set({
                data: JSON.parse(JSON.stringify(data)),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                email: currentUser.email,
                displayName: currentUser.displayName
            }, { merge: true }).catch(function(err) {
                console.error('Firestore save error:', err);
            });
        } catch(e) {
            console.error('Firestore save error:', e);
        }
    }

    function loadFromFirestore(callback) {
        if (!firebaseReady || !currentUser) {
            callback(null);
            return;
        }
        db.collection('users').doc(currentUser.uid).get().then(function(doc) {
            if (doc.exists && doc.data().data) {
                callback(doc.data().data);
            } else {
                callback(null);
            }
        }).catch(function(err) {
            console.error('Firestore load error:', err);
            callback(null);
        });
    }

    function listenToFirestore() {
        if (!firebaseReady || !currentUser || isOfflineMode) return;
        if (firestoreUnsubscribe) firestoreUnsubscribe();
        firestoreUnsubscribe = db.collection('users').doc(currentUser.uid).onSnapshot(function(doc) {
            if (doc.exists && doc.metadata.hasPendingWrites === false) {
                // Detect tier changes (from webhook or manual update)
                var remoteTier = doc.data().tier;
                if (remoteTier && remoteTier !== userTier) {
                    userTier = remoteTier;
                    updateUpgradeButtonVisibility();
                    try { render(); } catch(e) {}
                }

                // Sync app data
                if (doc.data().data) {
                    var remoteData = doc.data().data;
                    var localStr = JSON.stringify(data);
                    var remoteStr = JSON.stringify(remoteData);
                    if (localStr !== remoteStr) {
                        data = remoteData;
                        ensureDataFields();
                        applyDataMigrations();
                        saveDataEncrypted();
                        try { render(); } catch(e) { console.error('render error on sync:', e); }
                    }
                }
            }
        });
    }

    function ensureDataFields() {
        if (!data) data = defaultData();
        if (data.sessionTaskCount === undefined) data.sessionTaskCount = 0;
        if (data.extendedBreakThreshold === undefined) data.extendedBreakThreshold = Math.floor(Math.random() * 2) + 4;
        if (!data.sheetsToken) data.sheetsToken = '';
        if (!data.archived) data.archived = [];
        if (!data.log) data.log = [];
        if (!data.outcomes) data.outcomes = [];
        if (!data.reflections) data.reflections = [];
        if (!data.values) data.values = [];
        if (!data.badges) data.badges = [];
        // Seed starter outcomes for first-time users
        if (data.outcomes.length === 0) seedStarterOutcomes();
    }

    function seedStarterOutcomes() {
        var today = new Date().toDateString();
        var d7 = new Date();
        d7.setDate(d7.getDate() + 7);
        var deadline = d7.toISOString().split('T')[0];

        function makeAction(text, cat) {
            return { id: uid(), text: text, categories: [cat], estMinutes: 15, deadline: deadline, done: false, completedDate: null };
        }

        var seeds = [
            {
                result: 'Clean Living Space',
                purpose: 'Create a tidy, energizing environment',
                category: 'fun_environment',
                actions: [
                    makeAction('Clean Desk', 'fun_environment'),
                    makeAction('Clean Bathroom', 'fun_environment'),
                    makeAction('Wash floors in the kitchen', 'fun_environment')
                ]
            },
            {
                result: 'Connect with Loved Ones',
                purpose: 'Nurture relationships that matter',
                category: 'relationships',
                actions: [
                    makeAction('Meet with a friend / family for Lunch / Dinner / Walk', 'relationships')
                ]
            },
            {
                result: 'Healthy Daily Habits',
                purpose: 'Build energy and vitality',
                category: 'health_energy',
                actions: [
                    makeAction('Workout 20 mins', 'health_energy'),
                    makeAction('Plan your Meal for tomorrow', 'health_energy')
                ]
            },
            {
                result: 'Apply & Grow',
                purpose: 'Turn knowledge into action',
                category: 'personal_growth',
                actions: [
                    makeAction('Apply What you\'ve learned', 'personal_growth')
                ]
            },
            {
                result: 'Share Your Knowledge',
                purpose: 'Contribute and build your reputation',
                category: 'career_contribution',
                actions: [
                    makeAction('Share your knowledge with one person', 'career_contribution')
                ]
            },
            {
                result: 'Get Finances in Order',
                purpose: 'Take control of your money',
                category: 'money_finances',
                actions: [
                    makeAction('Check all your statements', 'money_finances'),
                    makeAction('Close one / all credit card(s)', 'money_finances'),
                    makeAction('Set up a budget for next week / month', 'money_finances')
                ]
            }
        ];

        seeds.forEach(function(s) {
            data.outcomes.push({
                id: uid(),
                result: s.result,
                purpose: s.purpose,
                actions: s.actions,
                category: s.category,
                deadline: deadline,
                commitment: 7,
                completed: false,
                createdDate: today
            });
        });
    }

    // ==========================================
    //  GENERATE UNIQUE IDS
    // ==========================================
    function uid() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    // ==========================================
    //  STREAK MANAGEMENT + STREAK FREEZE
    // ==========================================

    // Ensure streak freeze data exists
    function ensureStreakFreezeData() {
        if (typeof data.streakFreezes === 'undefined') data.streakFreezes = 1; // Start with 1 free freeze
        if (!data.freezeLog) data.freezeLog = [];
        if (typeof data.badDayCompleted === 'undefined') data.badDayCompleted = null;
    }

    function updateStreak() {
        var today = new Date().toDateString();
        if (data.lastActiveDate === today) return;
        ensureStreakFreezeData();
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (data.lastActiveDate === yesterday.toDateString()) {
            data.streak++;
            // Award a streak freeze every 7-day streak milestone
            if (data.streak > 0 && data.streak % 7 === 0) {
                data.streakFreezes = (data.streakFreezes || 0) + 1;
                try { showStreakFreezeEarned(); } catch(e) {}
            }
        } else if (data.lastActiveDate !== today) {
            // Missed days — try to use streak freeze
            var daysMissed = getDaysBetween(data.lastActiveDate, today);
            if (daysMissed <= 2 && data.streakFreezes > 0) {
                // Use a streak freeze to save the streak
                data.streakFreezes--;
                data.freezeLog.push({ date: today, daysMissed: daysMissed, streakSaved: data.streak });
                data.streak++; // Continue as if no break
                try { showStreakFreezedUsed(daysMissed); } catch(e) {}
            } else {
                data.streak = 1; // Reset streak
            }
        }
        data.lastActiveDate = today;
        if (data.streak > data.bestStreak) data.bestStreak = data.streak;
        saveData();
    }

    function getDaysBetween(dateStr1, dateStr2) {
        if (!dateStr1) return 999;
        var d1 = new Date(dateStr1);
        var d2 = new Date(dateStr2);
        var diffMs = Math.abs(d2 - d1);
        return Math.floor(diffMs / (1000 * 60 * 60 * 24));
    }

    function showStreakFreezeEarned() {
        var toast = document.getElementById('challengeToast');
        var toastText = document.getElementById('challengeToastText');
        if (toast && toastText) {
            toastText.textContent = '\u{1F9CA} Streak Freeze earned! You now have ' + data.streakFreezes + ' freeze(s).';
            toast.classList.remove('hidden');
            setTimeout(function() { toast.classList.add('hidden'); }, 4000);
        }
    }

    function showStreakFreezedUsed(daysMissed) {
        var toast = document.getElementById('challengeToast');
        var toastText = document.getElementById('challengeToastText');
        if (toast && toastText) {
            toastText.textContent = '\u{1F9CA} Streak Freeze used! Your ' + data.streak + '-day streak was saved. (' + data.streakFreezes + ' freezes left)';
            toast.classList.remove('hidden');
            setTimeout(function() { toast.classList.add('hidden'); }, 5000);
        }
    }

    // ==========================================
    //  COMPASSIONATE RE-ENTRY
    // ==========================================
    function checkCompassionateReEntry() {
        if (!data || !data.lastActiveDate) return;
        var today = new Date().toDateString();
        if (data.lastActiveDate === today) return; // Active today already

        var daysMissed = getDaysBetween(data.lastActiveDate, today);
        if (daysMissed < 2) return; // Only 1 day gap — normal

        // Check if we already showed this today
        var reentryKey = 'lwp_reentry_shown_' + today;
        if (localStorage.getItem(reentryKey)) return;
        localStorage.setItem(reentryKey, '1');

        var overlay = document.getElementById('welcomeBackOverlay');
        var titleEl = document.getElementById('welcomeBackTitle');
        var msgEl = document.getElementById('welcomeBackMsg');
        var streakInfoEl = document.getElementById('welcomeBackStreakInfo');
        if (!overlay || !titleEl || !msgEl) return;

        // Set message based on days away
        if (daysMissed <= 3) {
            titleEl.textContent = 'Welcome Back! \u{1F331}';
            msgEl.textContent = 'You were away for ' + daysMissed + ' days. No judgment \u2014 you\'re here now, and that\'s what matters.';
        } else if (daysMissed <= 7) {
            titleEl.textContent = 'Hey, You\'re Back! \u{1F33B}';
            msgEl.textContent = 'It\'s been ' + daysMissed + ' days. Life happens. The fact that you opened this app shows real strength.';
        } else if (daysMissed <= 30) {
            titleEl.textContent = 'Look Who\'s Here! \u{1F31F}';
            msgEl.textContent = daysMissed + ' days away? That takes courage to come back. Most people don\'t. You just did.';
        } else {
            titleEl.textContent = 'Welcome Home! \u{1F3E0}';
            msgEl.textContent = 'It\'s been a while, but fresh starts are powerful. Every expert was once a beginner again.';
        }

        // Streak info
        ensureStreakFreezeData();
        var streakHtml = '';
        if (data.streak > 0 && data.streakFreezes > 0 && daysMissed <= 2) {
            streakHtml = '<div style="font-size:1.2rem;font-weight:600">\u{1F9CA} Your streak was saved by a Streak Freeze!</div>';
            streakHtml += '<div style="margin-top:4px">Current streak: <strong>' + data.streak + ' days</strong> \u{1F525}</div>';
            streakHtml += '<div style="font-size:0.85rem;margin-top:4px">Freezes remaining: ' + data.streakFreezes + '</div>';
        } else if (data.streak > 0) {
            streakHtml = '<div style="font-size:0.9rem">Your previous streak: <strong>' + data.streak + ' days</strong></div>';
            streakHtml += '<div style="margin-top:4px;font-weight:600;color:var(--accent-green)">Let\'s start a new one today! \u{1F4AA}</div>';
        } else {
            streakHtml = '<div style="font-weight:600;color:var(--accent-green)">Today is Day 1. Let\'s go! \u{1F680}</div>';
        }
        if (data.streakFreezes > 0) {
            streakHtml += '<div style="font-size:0.8rem;margin-top:8px;opacity:0.7">\u{1F9CA} You have ' + data.streakFreezes + ' Streak Freeze(s) to protect future streaks</div>';
        }
        if (streakInfoEl) streakInfoEl.innerHTML = streakHtml;

        overlay.classList.remove('hidden');
    }

    // ==========================================
    //  BAD DAY MODE
    // ==========================================
    var badDayTasksCompleted = 0;

    // Make completeBadDayTask globally accessible (called from onclick in HTML)
    window.completeBadDayTask = function(btnEl) {
        var taskEl = btnEl.closest('.bad-day-task');
        if (!taskEl || taskEl.classList.contains('completed')) return;

        taskEl.classList.add('completed');
        btnEl.textContent = '\u{2705} Done!';
        btnEl.disabled = true;
        badDayTasksCompleted++;

        // Award minimal XP
        data.totalMomentum = (data.totalMomentum || 0) + 10;

        // Update footer
        var footer = document.getElementById('badDayFooter');
        if (footer) {
            if (badDayTasksCompleted === 1) {
                footer.textContent = 'Your streak is alive! Keep going or call it a win \u{1F496}';
            } else if (badDayTasksCompleted === 2) {
                footer.textContent = 'Two done! You\'re doing amazing on a tough day \u{1F31F}';
            }
        }

        // Mark today as active (preserves streak) after first task
        if (badDayTasksCompleted === 1) {
            data.badDayCompleted = new Date().toDateString();
            updateStreak();
        }

        // All 3 done — celebration and close
        if (badDayTasksCompleted >= 3) {
            data.totalMomentum += 20; // Bonus for finishing all 3
            saveData();

            // Log bad day tasks
            var today = new Date();
            data.log.push({
                text: 'Bad Day Mode: Self-care tasks completed',
                outcome: 'Self Care',
                category: getActiveCategories()[0].id,
                time: today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                date: today.toDateString(),
                points: 50
            });
            saveData();

            if (footer) {
                footer.innerHTML = '<span style="font-size:1.5rem">\u{1F389}</span> All 3 done! You showed up on a hard day. That\'s the real win.';
            }

            // Close after short delay with celebration
            setTimeout(function() {
                document.getElementById('badDayOverlay').classList.add('hidden');
                showPraise();
                playCompletionAudio();
                render();
                // Reset bad day tasks for next time
                resetBadDayTasks();
            }, 2500);
        } else {
            saveData();
        }
    };

    function resetBadDayTasks() {
        badDayTasksCompleted = 0;
        var tasks = document.querySelectorAll('.bad-day-task');
        tasks.forEach(function(t) {
            t.classList.remove('completed');
            var btn = t.querySelector('.btn-bad-day-done');
            if (btn) { btn.textContent = 'Done \u{2713}'; btn.disabled = false; }
        });
        var footer = document.getElementById('badDayFooter');
        if (footer) footer.textContent = 'Complete any one to keep your streak alive \u{1F496}';
    }

    // Make stopBodyDouble globally accessible (called from onclick in HTML)
    window.stopBodyDouble = function() {
        if (bodyDoubleInterval) { clearInterval(bodyDoubleInterval); bodyDoubleInterval = null; }
        if (bodyDoubleBuddyInterval) { clearInterval(bodyDoubleBuddyInterval); bodyDoubleBuddyInterval = null; }
        stopAmbientSound();
        var overlay = document.getElementById('bodyDoubleOverlay');
        if (overlay) overlay.classList.add('hidden');
        var startBtn = document.getElementById('btnStartBodyDouble');
        var stopBtn = document.getElementById('btnStopBodyDouble');
        if (startBtn) startBtn.classList.remove('hidden');
        if (stopBtn) stopBtn.classList.add('hidden');
        var timerDisplay = document.getElementById('bodyDoubleTimerDisplay');
        if (timerDisplay) timerDisplay.textContent = '15:00';
        var repeatBtn = document.getElementById('btnRepeatBodyDouble');
        if (repeatBtn) repeatBtn.classList.add('hidden');
    };

    // ==========================================
    //  BODY DOUBLE TIMER
    // ==========================================
    var bodyDoubleInterval = null;
    var bodyDoubleBuddyInterval = null;
    var bodyDoubleSeconds = 15 * 60;
    var currentAmbientSound = null;

    var BUDDY_MESSAGES = [
        { emoji: '\u{1F9D1}\u200D\u{1F4BB}', msg: 'Your buddy is working quietly beside you...' },
        { emoji: '\u{1F4AA}', msg: 'You\'re both crushing it! Keep going.' },
        { emoji: '\u{2615}', msg: 'Focus is a superpower. You have it right now.' },
        { emoji: '\u{1F4DA}', msg: 'Deep work mode activated. Your buddy is impressed.' },
        { emoji: '\u{1F680}', msg: 'Almost there! Your buddy is cheering you on.' },
        { emoji: '\u{1F31F}', msg: 'You showed up today. That\'s already a win.' },
        { emoji: '\u{1F9D8}', msg: 'Breathe. Focus. You\'ve got this.' },
        { emoji: '\u{1F389}', msg: 'Your buddy just completed a task too! You\'re in sync.' }
    ];

    // Web Audio API ambient sound generators (no external URLs needed)
    var ambientAudioCtx = null;
    var ambientNodes = [];

    function createRainSound(ctx) {
        // Brown noise filtered to sound like rain
        var bufferSize = 2 * ctx.sampleRate;
        var buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
        for (var ch = 0; ch < 2; ch++) {
            var data = buffer.getChannelData(ch);
            var lastOut = 0;
            for (var i = 0; i < bufferSize; i++) {
                var white = Math.random() * 2 - 1;
                data[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = data[i];
                data[i] *= 3.5;
            }
        }
        var source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        // Bandpass to make it sound like rain
        var bandpass = ctx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 800;
        bandpass.Q.value = 0.5;
        // Highpass to remove rumble
        var highpass = ctx.createBiquadFilter();
        highpass.type = 'highpass';
        highpass.frequency.value = 200;
        var gain = ctx.createGain();
        gain.gain.value = 0.25;
        source.connect(bandpass);
        bandpass.connect(highpass);
        highpass.connect(gain);
        gain.connect(ctx.destination);
        source.start();
        return { source: source, nodes: [bandpass, highpass, gain] };
    }

    function createCoffeeShopSound(ctx) {
        // Pink noise + subtle low murmur = cafe ambience
        var bufferSize = 2 * ctx.sampleRate;
        var buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
        for (var ch = 0; ch < 2; ch++) {
            var data = buffer.getChannelData(ch);
            var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
            for (var i = 0; i < bufferSize; i++) {
                var white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                data[i] *= 0.11;
                b6 = white * 0.115926;
            }
        }
        var source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        // Lowpass to soften and make it cozy
        var lowpass = ctx.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.value = 2000;
        lowpass.Q.value = 0.3;
        var gain = ctx.createGain();
        gain.gain.value = 0.3;
        source.connect(lowpass);
        lowpass.connect(gain);
        gain.connect(ctx.destination);
        source.start();
        return { source: source, nodes: [lowpass, gain] };
    }

    function createLofiSound(ctx) {
        // Warm brown noise with gentle low-frequency oscillation
        var bufferSize = 2 * ctx.sampleRate;
        var buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
        for (var ch = 0; ch < 2; ch++) {
            var data = buffer.getChannelData(ch);
            var lastOut = 0;
            for (var i = 0; i < bufferSize; i++) {
                var white = Math.random() * 2 - 1;
                data[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = data[i];
                data[i] *= 3.5;
            }
        }
        var source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        // Warm lowpass
        var lowpass = ctx.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.value = 500;
        lowpass.Q.value = 1;
        // Gentle LFO for breathing feel
        var lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.25;
        var lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.1; // Very slow wobble
        var lfoDepth = ctx.createGain();
        lfoDepth.gain.value = 0.05;
        lfo.connect(lfoDepth);
        lfoDepth.connect(lfoGain.gain);
        lfo.start();
        source.connect(lowpass);
        lowpass.connect(lfoGain);
        lfoGain.connect(ctx.destination);
        source.start();
        return { source: source, lfo: lfo, nodes: [lowpass, lfoGain, lfoDepth] };
    }

    function startBodyDouble() {
        bodyDoubleSeconds = 15 * 60;
        var timerDisplay = document.getElementById('bodyDoubleTimerDisplay');
        var startBtn = document.getElementById('btnStartBodyDouble');
        var stopBtn = document.getElementById('btnStopBodyDouble');
        if (startBtn) startBtn.classList.add('hidden');
        if (stopBtn) stopBtn.classList.remove('hidden');

        // Start timer
        bodyDoubleInterval = setInterval(function() {
            bodyDoubleSeconds--;
            if (bodyDoubleSeconds <= 0) {
                clearInterval(bodyDoubleInterval);
                bodyDoubleInterval = null;
                if (timerDisplay) timerDisplay.textContent = '00:00';
                bodyDoubleSessionComplete();
                return;
            }
            var m = Math.floor(bodyDoubleSeconds / 60);
            var s = bodyDoubleSeconds % 60;
            if (timerDisplay) timerDisplay.textContent = (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
        }, 1000);

        // Buddy message rotation every 5 minutes
        updateBuddyMessage();
        bodyDoubleBuddyInterval = setInterval(updateBuddyMessage, 5 * 60 * 1000);

        // Start ambient sound based on selected button
        var activeBtn = document.querySelector('.bd-sound-btn.active');
        var soundKey = activeBtn ? activeBtn.dataset.sound : 'none';
        playAmbientSound(soundKey);
    }

    function updateBuddyMessage() {
        var msg = BUDDY_MESSAGES[Math.floor(Math.random() * BUDDY_MESSAGES.length)];
        var emojiEl = document.getElementById('bdBuddyEmoji');
        var statusEl = document.getElementById('bdBuddyStatus');
        if (emojiEl) emojiEl.textContent = msg.emoji;
        if (statusEl) statusEl.textContent = msg.msg;
    }

    function playAmbientSound(key) {
        stopAmbientSound();
        if (key === 'none') return;
        // Audio-file based sounds
        if (key === 'ocean' || key === 'coffee') {
            try {
                var fileMap = { ocean: 'audio/ocean-waves.m4a', coffee: 'audio/coffee-shop.m4a' };
                var audio = new Audio(fileMap[key]);
                audio.loop = true;
                audio.volume = 0.4;
                currentAmbientSound = audio;
                audio.play().catch(function(e) { console.warn('Ambient audio play failed:', e); });
            } catch(e) {
                console.warn('Could not play ambient sound:', e);
            }
            return;
        }
        // Web Audio API generated sounds
        try {
            ambientAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
            var result;
            if (key === 'rain') {
                result = createRainSound(ambientAudioCtx);
            } else if (key === 'lofi') {
                result = createLofiSound(ambientAudioCtx);
            }
            if (result) {
                ambientNodes.push(result.source);
                if (result.lfo) ambientNodes.push(result.lfo);
                if (result.nodes) result.nodes.forEach(function(n) { ambientNodes.push(n); });
            }
        } catch(e) {
            console.warn('Could not play ambient sound:', e);
        }
    }

    function stopAmbientSound() {
        ambientNodes.forEach(function(node) {
            try { node.disconnect(); } catch(e) {}
            try { if (node.stop) node.stop(); } catch(e) {}
        });
        ambientNodes = [];
        if (ambientAudioCtx) {
            try { ambientAudioCtx.close(); } catch(e) {}
            ambientAudioCtx = null;
        }
        // Also stop old Audio-based sound if any
        if (currentAmbientSound) {
            try { currentAmbientSound.pause(); currentAmbientSound.currentTime = 0; } catch(e) {}
            currentAmbientSound = null;
        }
    }

    function bodyDoubleSessionComplete() {
        if (bodyDoubleBuddyInterval) { clearInterval(bodyDoubleBuddyInterval); bodyDoubleBuddyInterval = null; }
        stopAmbientSound();

        var emojiEl = document.getElementById('bdBuddyEmoji');
        var statusEl = document.getElementById('bdBuddyStatus');
        if (emojiEl) emojiEl.textContent = '\u{1F389}';
        if (statusEl) statusEl.textContent = 'Session complete! You both crushed it!';

        // Award bonus XP for completing a full body double session
        data.totalMomentum = (data.totalMomentum || 0) + 25;
        saveData();

        playCompletionAudio();

        // Show Repeat button, hide Stop button
        var stopBtn = document.getElementById('btnStopBodyDouble');
        var repeatBtn = document.getElementById('btnRepeatBodyDouble');
        if (stopBtn) stopBtn.classList.add('hidden');
        if (repeatBtn) repeatBtn.classList.remove('hidden');

        render();
    }

    // ==========================================
    //  FOUNDING MEMBER FEEDBACK SYSTEM
    // ==========================================
    function checkFeedbackTrigger() {
        // Only for logged-in founding members
        if (!currentUser || isOfflineMode) return;
        if (!isFoundingMember) return;

        var today = new Date().toDateString();
        var feedbackKey = 'lwp_daily_fb_' + today;
        if (localStorage.getItem(feedbackKey)) return; // Already shown/submitted today

        // Only trigger after at least 3 actions today
        var todayActions = (data.log || []).filter(function(e) { return e.date === today; }).length;
        if (todayActions < 3) return;

        // Guaranteed once per day for founding members (no random skip)
        setTimeout(function() {
            showDailyFeedbackModal();
        }, 2000);
    }

    function showDailyFeedbackModal() {
        var today = new Date().toDateString();
        localStorage.setItem('lwp_daily_fb_' + today, 'shown');

        var overlay = document.getElementById('dailyFeedbackOverlay');
        if (!overlay) return;

        // Reset form
        overlay.querySelectorAll('input[type="checkbox"]').forEach(function(cb) { cb.checked = false; });
        overlay.querySelectorAll('input[type="radio"]').forEach(function(rb) { rb.checked = false; });
        overlay.querySelectorAll('.df-chip').forEach(function(chip) { chip.classList.remove('checked'); });
        overlay.querySelectorAll('.emoji-rating-btn').forEach(function(btn) { btn.classList.remove('selected'); });
        var quickThought = document.getElementById('dfQuickThought');
        if (quickThought) quickThought.value = '';

        overlay.classList.remove('hidden');
    }

    function submitDailyFeedback() {
        var completedTop = document.getElementById('dfCompletedTop');
        var completedTopValue = completedTop ? completedTop.checked : false;

        var helpfulFeatures = [];
        document.querySelectorAll('.df-feature-cb:checked').forEach(function(cb) {
            helpfulFeatures.push(cb.value);
        });

        var issuesFound = [];
        document.querySelectorAll('.df-issue-cb:checked').forEach(function(cb) {
            issuesFound.push(cb.value);
        });

        var motivationLevel = 3;
        var selectedEmoji = document.querySelector('.emoji-rating-btn.selected');
        if (selectedEmoji) motivationLevel = parseInt(selectedEmoji.dataset.value);

        var quickThought = (document.getElementById('dfQuickThought') || {}).value || '';

        var workedOn = [];
        document.querySelectorAll('.df-workedon-cb:checked').forEach(function(cb) {
            workedOn.push(cb.value);
        });

        var onTrack = '';
        var selectedOnTrack = document.querySelector('.df-ontrack-radio:checked');
        if (selectedOnTrack) onTrack = selectedOnTrack.value;

        var feedbackData = {
            uid: currentUser.uid,
            email: currentUser.email || '',
            date: new Date().toISOString(),
            dateString: new Date().toDateString(),
            completedTopAction: completedTopValue,
            helpfulFeatures: helpfulFeatures,
            issuesFound: issuesFound,
            motivationLevel: motivationLevel,
            workedOn: workedOn,
            onTrack: onTrack,
            quickThought: quickThought,
            streak: data.streak || 0,
            totalActions: data.log ? data.log.length : 0,
            mode: currentMode
        };

        if (firebaseReady) {
            try {
                db.collection('daily_feedback').add(feedbackData);
                db.collection('feedback_notifications').add({
                    type: 'daily_feedback',
                    userName: currentUser.displayName || currentUser.email,
                    date: new Date().toISOString(),
                    summary: {
                        completedTop: completedTopValue,
                        motivation: motivationLevel,
                        issues: issuesFound,
                        features: helpfulFeatures,
                        workedOn: workedOn,
                        onTrack: onTrack,
                        thought: quickThought
                    },
                    ownerEmail: 'ereana.swan@gmail.com'
                });
                db.collection('users').doc(currentUser.uid).set({
                    lastFeedbackDate: new Date().toISOString(),
                    feedbackStreak: firebase.firestore.FieldValue.increment(1),
                    lastActiveDate: new Date().toISOString(),
                    feedbackWarned: false
                }, { merge: true });
            } catch(e) { console.error('Daily feedback error:', e); }
        }

        localStorage.setItem('lwp_daily_fb_' + new Date().toDateString(), 'submitted');
        document.getElementById('dailyFeedbackOverlay').classList.add('hidden');

        var toast = document.getElementById('challengeToast');
        var toastText = document.getElementById('challengeToastText');
        if (toast && toastText) {
            toastText.textContent = '\u2705 Feedback logged! You\u2019re helping build something amazing.';
            toast.classList.remove('hidden');
            setTimeout(function() { toast.classList.add('hidden'); }, 4000);
        }
    }

    function showFeedbackModal() {
        var today = new Date().toDateString();
        var feedbackKey = 'lwp_feedback_' + today;
        localStorage.setItem(feedbackKey, 'shown');

        var overlay = document.getElementById('feedbackOverlay');
        if (!overlay) return;

        // Reset form
        var worked = document.getElementById('feedbackWorked');
        var broken = document.getElementById('feedbackBroken');
        var wish = document.getElementById('feedbackWish');
        var rating = document.getElementById('feedbackRating');
        var ratingValue = document.getElementById('feedbackRatingValue');
        var testimonialSection = document.getElementById('feedbackTestimonialSection');

        if (worked) worked.value = '';
        if (broken) broken.value = '';
        if (wish) wish.value = '';
        if (rating) rating.value = '7';
        if (ratingValue) ratingValue.textContent = '7';
        if (testimonialSection) testimonialSection.classList.add('hidden');

        // Show onboarding questions only on first feedback
        var onboardingSection = document.getElementById('feedbackOnboardingSection');
        if (onboardingSection) {
            var alreadyOnboarded = localStorage.getItem('lwp_onboarding_done');
            if (!alreadyOnboarded) {
                onboardingSection.classList.remove('hidden');
            } else {
                onboardingSection.classList.add('hidden');
            }
        }

        // Dynamic title based on how long they've been using
        var daysSinceStart = data.log && data.log.length > 0 ? getDaysBetween(data.log[0].date, today) : 0;
        var titleEl = document.getElementById('feedbackTitle');
        if (titleEl) {
            if (daysSinceStart <= 3) titleEl.textContent = 'First Impressions \u{1F31F}';
            else if (daysSinceStart <= 7) titleEl.textContent = 'Week 1 Check-In \u{1F4AC}';
            else if (daysSinceStart <= 14) titleEl.textContent = 'How\'s It Going? \u{1F914}';
            else titleEl.textContent = 'Daily Feedback \u{1F4AC}';
        }

        overlay.classList.remove('hidden');
    }

    function submitFeedback() {
        var worked = (document.getElementById('feedbackWorked') || {}).value || '';
        var broken = (document.getElementById('feedbackBroken') || {}).value || '';
        var wish = (document.getElementById('feedbackWish') || {}).value || '';
        var rating = parseInt((document.getElementById('feedbackRating') || {}).value) || 7;
        var testimonial = (document.getElementById('feedbackTestimonial') || {}).value || '';
        var displayName = (document.getElementById('feedbackDisplayName') || {}).value || '';

        // Must have at least one field filled
        if (!worked && !broken && !wish) {
            alert('Please fill in at least one feedback field!');
            return;
        }

        var feedbackData = {
            uid: currentUser ? currentUser.uid : 'anonymous',
            email: currentUser ? currentUser.email : '',
            date: new Date().toISOString(),
            worked: worked,
            broken: broken,
            wish: wish,
            rating: rating,
            streak: data.streak || 0,
            totalActions: data.log ? data.log.length : 0,
            mode: currentMode
        };

        // Capture onboarding data (first-time only)
        if (!localStorage.getItem('lwp_onboarding_done')) {
            var prevApps = [];
            document.querySelectorAll('.fb-prevapp-cb:checked').forEach(function(cb) {
                prevApps.push(cb.value);
            });
            var prevAppsOther = (document.getElementById('feedbackPrevAppsOther') || {}).value || '';
            var whyFailed = [];
            document.querySelectorAll('.fb-whyfailed-cb:checked').forEach(function(cb) {
                whyFailed.push(cb.value);
            });
            var hopingFor = [];
            document.querySelectorAll('.fb-hoping-cb:checked').forEach(function(cb) {
                hopingFor.push(cb.value);
            });
            feedbackData.onboarding = {
                previousApps: prevApps,
                previousAppsOther: prevAppsOther,
                whyPreviousFailed: whyFailed,
                hopingFor: hopingFor
            };
            localStorage.setItem('lwp_onboarding_done', '1');
        }

        // Add testimonial if provided
        if (testimonial && rating >= 8) {
            feedbackData.testimonial = testimonial;
            feedbackData.displayName = displayName || 'Anonymous';
        }

        // Save to Firestore
        if (firebaseReady) {
            try {
                db.collection('feedback').add(feedbackData).then(function() {
                    console.log('Feedback saved to Firestore');
                }).catch(function(e) {
                    console.error('Feedback save error:', e);
                });

                // Save testimonial separately for easy access
                if (feedbackData.testimonial) {
                    db.collection('testimonials').add({
                        text: feedbackData.testimonial,
                        displayName: feedbackData.displayName,
                        rating: rating,
                        date: new Date().toISOString(),
                        uid: currentUser.uid
                    }).catch(function(e) { console.error('Testimonial save error:', e); });
                }
            } catch(e) { console.error('Feedback Firestore error:', e); }
        }

        // Also save locally
        if (!data.feedbackHistory) data.feedbackHistory = [];
        data.feedbackHistory.push(feedbackData);
        saveData();

        // Mark as submitted today
        localStorage.setItem('lwp_feedback_' + new Date().toDateString(), 'submitted');

        // Close and show thank you
        document.getElementById('feedbackOverlay').classList.add('hidden');
        var toast = document.getElementById('challengeToast');
        var toastText = document.getElementById('challengeToastText');
        if (toast && toastText) {
            toastText.textContent = '\u{2764}\u{FE0F} Thank you for your feedback! You\'re helping shape Habit Magic.';
            toast.classList.remove('hidden');
            setTimeout(function() { toast.classList.add('hidden'); }, 5000);
        }
    }

    // ==========================================
    //  OFFLINE-TO-ACCOUNT DATA MIGRATION
    // ==========================================
    function checkOfflineDataMigration(uid) {
        var offlineRaw = localStorage.getItem(OFFLINE_STORAGE_KEY);
        if (!offlineRaw) return;
        var offlineData;
        try { offlineData = JSON.parse(offlineRaw); } catch(e) { return; }
        if (!offlineData || !offlineData.outcomes || offlineData.outcomes.length === 0) return;

        // Check if already migrated
        var migrationKey = 'lwp_offline_migrated_' + uid;
        if (localStorage.getItem(migrationKey)) return;

        // Count what we'd migrate
        var outcomeCount = offlineData.outcomes.length;
        var actionCount = 0;
        offlineData.outcomes.forEach(function(o) { actionCount += (o.actions ? o.actions.length : 0); });
        var logCount = offlineData.log ? offlineData.log.length : 0;

        // Show migration prompt
        var msg = 'Found ' + outcomeCount + ' outcome(s) and ' + logCount + ' log entries from offline/demo mode. Merge into your account?';
        if (confirm('\u{1F4E6} ' + msg)) {
            // Merge outcomes (skip duplicates by result name)
            var existingNames = {};
            data.outcomes.forEach(function(o) { existingNames[o.result.toLowerCase()] = true; });
            offlineData.outcomes.forEach(function(o) {
                if (!existingNames[o.result.toLowerCase()]) {
                    data.outcomes.push(o);
                }
            });

            // Merge log entries (add all, no dedup)
            if (offlineData.log) {
                offlineData.log.forEach(function(entry) {
                    data.log.push(entry);
                });
            }

            // Merge momentum
            data.totalMomentum = (data.totalMomentum || 0) + (offlineData.totalMomentum || 0);

            // Merge streak if offline had a better one
            if ((offlineData.bestStreak || 0) > (data.bestStreak || 0)) {
                data.bestStreak = offlineData.bestStreak;
            }

            // Merge badges
            if (offlineData.badges && offlineData.badges.length > 0) {
                var existingBadges = {};
                (data.badges || []).forEach(function(b) { existingBadges[b.id || b] = true; });
                offlineData.badges.forEach(function(b) {
                    if (!existingBadges[b.id || b]) data.badges.push(b);
                });
            }

            saveData();
            localStorage.setItem(migrationKey, '1');

            // Show success toast
            var toast = document.getElementById('challengeToast');
            var toastText = document.getElementById('challengeToastText');
            if (toast && toastText) {
                toastText.textContent = '\u{2705} Offline data merged! ' + outcomeCount + ' outcomes imported.';
                toast.classList.remove('hidden');
                setTimeout(function() { toast.classList.add('hidden'); }, 5000);
            }

            render();
        } else {
            // User declined — mark so we don't ask again
            localStorage.setItem(migrationKey, 'declined');
        }
    }

    // ==========================================
    //  DOWNLOAD/EXPORT ACTION LOG
    // ==========================================
    function exportActionLog() {
        if (!data || !data.log || data.log.length === 0) {
            alert('No actions to export yet!');
            return;
        }
        // Get last 30 days of log entries
        var thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        var entries = data.log.filter(function(e) {
            var d = new Date(e.date);
            return d >= thirtyDaysAgo;
        });
        if (entries.length === 0) entries = data.log; // fallback: all entries

        // Build CSV
        var csv = 'Date,Time,Action,Outcome,Category,Points,Minutes\n';
        entries.forEach(function(e) {
            var row = [
                '"' + (e.date || '') + '"',
                '"' + (e.time || '') + '"',
                '"' + (e.text || '').replace(/"/g, '""') + '"',
                '"' + (e.outcome || '').replace(/"/g, '""') + '"',
                '"' + (e.category || '') + '"',
                e.points || 0,
                e.actualMinutes || ''
            ];
            csv += row.join(',') + '\n';
        });

        var blob = new Blob([csv], { type: 'text/csv' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'habit-magic-log-' + new Date().toISOString().split('T')[0] + '.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // ==========================================
    //  AUTO-BREAK BIG TASKS NUDGE
    // ==========================================
    var BIG_TASK_KEYWORDS = ['build', 'create', 'organize', 'plan', 'redesign', 'overhaul', 'launch',
        'implement', 'develop', 'set up', 'setup', 'restructure', 'revamp', 'redo', 'fix everything',
        'clean the whole', 'entire', 'complete', 'finish all', 'do all'];

    function checkBigTaskNudge(inputEl) {
        var text = (inputEl.value || '').trim().toLowerCase();
        if (!text || text.length < 15) return; // Too short to be a big task

        // Remove any existing nudge
        var existingNudge = inputEl.parentElement.querySelector('.big-task-nudge');
        if (existingNudge) existingNudge.remove();

        var isBig = text.length > 40 || BIG_TASK_KEYWORDS.some(function(kw) { return text.includes(kw); });
        if (!isBig) return;

        var nudge = document.createElement('div');
        nudge.className = 'big-task-nudge';
        nudge.innerHTML = '<span class="nudge-icon">\u{1F9E0}</span> ' +
            '<span class="nudge-text">This sounds like a big one! Break it into 2\u20133 smaller bites? ' +
            'Your brain will thank you. <strong>Tasks under 20 min each work best.</strong></span>' +
            '<button class="nudge-dismiss" onclick="this.parentElement.remove()">\u00D7</button>';
        inputEl.parentElement.appendChild(nudge);

        // Auto-dismiss after 15 seconds
        setTimeout(function() {
            if (nudge.parentElement) nudge.remove();
        }, 15000);
    }

    // Attach big task detection to action input fields via event delegation
    function initBigTaskNudge() {
        document.addEventListener('blur', function(e) {
            if (e.target && e.target.matches('#actionsList input[type="text"], #addActionText, #editActionText')) {
                try { checkBigTaskNudge(e.target); } catch(err) { console.warn('big task nudge error:', err); }
            }
        }, true); // use capture phase for blur
    }

    // ==========================================
    //  STREAK FREEZE INDICATOR
    // ==========================================
    function renderStreakFreezeIndicator() {
        ensureStreakFreezeData();
        var streakBar = document.querySelector('.streak-bar');
        if (!streakBar) return;
        // Remove existing freeze indicator
        var existing = streakBar.querySelector('.streak-freeze-count');
        if (existing) existing.remove();
        // Add freeze count if > 0
        if (data.streakFreezes > 0) {
            var freezeEl = document.createElement('span');
            freezeEl.className = 'streak-freeze-count';
            freezeEl.title = data.streakFreezes + ' Streak Freeze(s) available';
            freezeEl.textContent = '\u{1F9CA}' + data.streakFreezes;
            streakBar.appendChild(freezeEl);
        }
    }

    // ==========================================
    //  MOTIVATION QUOTE
    // ==========================================
    var QUOTE_COLORS = [
        { bg: 'rgba(124,111,186,0.10)', border: '#7c6fba', text: '#a8a0d0' },
        { bg: 'rgba(106,173,153,0.10)', border: '#6aad99', text: '#8dc4b0' },
        { bg: 'rgba(196,153,106,0.10)', border: '#c4996a', text: '#d4b68a' },
        { bg: 'rgba(106,157,186,0.10)', border: '#6a9dba', text: '#8db8d0' }
    ];

    function applyQuoteToElements(quoteElId, authorElId, cardElId) {
        var quote = MOTIVATION_QUOTES[Math.floor(Math.random() * MOTIVATION_QUOTES.length)];
        var color = QUOTE_COLORS[Math.floor(Math.random() * QUOTE_COLORS.length)];
        var quoteEl = document.getElementById(quoteElId);
        var authorEl = document.getElementById(authorElId);
        var cardEl = cardElId ? document.getElementById(cardElId) : (quoteEl ? quoteEl.closest('.motivation-card') : null);

        if (quoteEl) {
            quoteEl.textContent = '\u201C' + quote.text + '\u201D';
            quoteEl.style.color = color.text;
        }
        if (authorEl) {
            authorEl.textContent = '\u2014 ' + quote.author;
            authorEl.style.color = color.border;
        }
        if (cardEl) {
            cardEl.style.background = 'linear-gradient(135deg, #0f1a2a, ' + color.bg + ')';
            cardEl.style.borderColor = color.border + '44';
            cardEl.style.boxShadow = '0 0 20px ' + color.border + '15';
        }
    }

    function renderMotivationQuote() {
        applyQuoteToElements('motivationQuote', 'motivationAuthor', 'motivationCard1');
    }

    // ==========================================
    //  RENDER FUNCTIONS
    // ==========================================
    function render() {
        // Clear wheel score cache on each full render
        _cachedWheelScores = null;
        _wheelScoresCacheTime = 0;

        renderNextAction();
        renderOutcomes();
        renderMomentum();
        renderLog();
        renderDailyProgress();
        renderWheelOfLife();
        renderFocusBadge();
        // Gamification renders
        try { renderLevelBadge(); } catch(e) {}
        try { renderCombo(); } catch(e) {}
        try { renderDailyChallenges(); } catch(e) {}
        try { renderBadgesGrid(); } catch(e) {}
        try { renderWeeklyPowerScore(); } catch(e) {}
        try { renderStreakFreezeIndicator(); } catch(e) {}
        document.getElementById('streakCount').textContent = data.streak;
        document.getElementById('todayDate').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

        // Progressive disclosure: hide Wheel of Life and Motivation card until user has some activity
        var totalActions = data && data.log ? data.log.length : 0;
        var wheelCard = document.querySelector('.wheel-of-life-card');
        if (wheelCard) wheelCard.style.display = totalActions >= 3 ? '' : 'none';
        var motivationCard = document.getElementById('motivationCard1');
        if (motivationCard) motivationCard.style.display = totalActions >= 1 ? '' : 'none';
    }

    function renderFocusBadge() {
        var badge = document.getElementById('focusBadge');
        if (!badge) return;
        var label = getTodayFocusLabel(true);
        if (label) {
            badge.innerHTML = label;
            badge.style.display = '';
        } else {
            badge.style.display = 'none';
        }
    }

    // --- Sorting & Filtering ---
    var currentSort = 'leverage';
    var currentFilter = 'all';
    var focusCategoryFilter = 'all';
    var currentMode = 'personal'; // 'personal', 'business', 'health', or 'finances'

    function getActiveCategories() {
        if (currentMode === 'business') return BUSINESS_CATEGORIES;
        if (currentMode === 'health') return HEALTH_CATEGORIES;
        if (currentMode === 'finances') return FINANCES_CATEGORIES;
        return CATEGORIES;
    }

    function isOutcomeInCurrentMode(outcome) {
        var personalCatIds = CATEGORIES.map(function(c) { return c.id; });
        var businessCatIds = BUSINESS_CATEGORIES.map(function(c) { return c.id; });
        var healthCatIds = HEALTH_CATEGORIES.map(function(c) { return c.id; });
        var financesCatIds = FINANCES_CATEGORIES.map(function(c) { return c.id; });
        if (currentMode === 'business') {
            return businessCatIds.indexOf(outcome.category) !== -1;
        } else if (currentMode === 'health') {
            return healthCatIds.indexOf(outcome.category) !== -1;
        } else if (currentMode === 'finances') {
            return financesCatIds.indexOf(outcome.category) !== -1;
        } else {
            return personalCatIds.indexOf(outcome.category) !== -1;
        }
    }

    // ── Light / Dark theme ───────────────────────────────────────
    function initTheme() {
        var saved = localStorage.getItem('lwp_theme'); // 'light' or 'dark'
        if (saved === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        updateThemeIcon();
    }

    function toggleTheme() {
        document.body.classList.toggle('light-mode');
        var isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('lwp_theme', isLight ? 'light' : 'dark');
        updateThemeIcon();
    }

    function updateThemeIcon() {
        var btn = document.getElementById('btnTheme');
        if (!btn) return;
        var isLight = document.body.classList.contains('light-mode');
        btn.textContent = isLight ? '☀ Dark Mode' : '☾ Light Mode';
        btn.title = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
    }

    // Helper: update outcomes title text without destroying the collapse button
    function setOutcomesTitle(text) {
        var el = document.getElementById('outcomesTitle');
        if (!el) return;
        var btn = el.querySelector('#btnCollapseOutcomes');
        var isCollapsed = document.getElementById('outcomesSection') && document.getElementById('outcomesSection').classList.contains('collapsed');
        el.innerHTML = text + ' <button class="btn-collapse-section" id="btnCollapseOutcomes" title="' + (isCollapsed ? 'Show outcomes' : 'Hide/Show outcomes') + '">' + (isCollapsed ? '\u25B6' : '\u25BC') + '</button>';
        // Re-bind click since we recreated the button
        var newBtn = document.getElementById('btnCollapseOutcomes');
        if (newBtn) {
            newBtn.addEventListener('click', function() {
                var section = document.getElementById('outcomesSection');
                if (!section) return;
                var collapsed = section.classList.toggle('collapsed');
                this.textContent = collapsed ? '\u25B6' : '\u25BC';
                this.title = collapsed ? 'Show outcomes' : 'Hide outcomes';
                localStorage.setItem('lwp_outcomes_collapsed', collapsed ? '1' : '0');
            });
        }
    }

    function switchMode(mode) {
        try {
            // Tier gate: check if user can access this mode
            if (!canAccessMode(mode)) {
                showPricingModal(mode);
                return;
            }
            currentMode = mode;
            localStorage.setItem('lwp_current_mode', mode);

            // Update toggle buttons
            document.getElementById('btnPersonalMode').classList.toggle('active', mode === 'personal');
            document.getElementById('btnBusinessMode').classList.toggle('active', mode === 'business');
            var btnHealth = document.getElementById('btnHealthMode');
            if (btnHealth) btnHealth.classList.toggle('active', mode === 'health');
            var btnFinances = document.getElementById('btnFinancesMode');
            if (btnFinances) btnFinances.classList.toggle('active', mode === 'finances');

            // Sync mobile dropdown
            var mobileSelect = document.getElementById('modeSelectMobile');
            if (mobileSelect) mobileSelect.value = mode;

            // Update body class for background theming
            document.body.classList.toggle('business-mode', mode === 'business');
            document.body.classList.toggle('health-mode', mode === 'health');
            document.body.classList.toggle('finances-mode', mode === 'finances');

            // Update titles
            if (mode === 'business') {
                document.getElementById('focusTitle').textContent = 'Business Focus';
                document.getElementById('wheelTitle').innerHTML = 'Business Wheel <span class="wheel-period">Last 7 Days</span> <button class="btn-cat-guide" id="btnCatGuide" title="Category Guide">&#8505;</button>';
                setOutcomesTitle('\uD83C\uDFAF Business Outcomes');
            } else if (mode === 'health') {
                document.getElementById('focusTitle').textContent = 'Health Focus';
                document.getElementById('wheelTitle').innerHTML = 'Health Wheel <span class="wheel-period">Last 7 Days</span> <button class="btn-cat-guide" id="btnCatGuide" title="Category Guide">&#8505;</button>';
                setOutcomesTitle('\uD83C\uDFAF Health Goals');
            } else if (mode === 'finances') {
                document.getElementById('focusTitle').textContent = 'Finances Focus';
                document.getElementById('wheelTitle').innerHTML = 'Finances Wheel <span class="wheel-period">Last 7 Days</span> <button class="btn-cat-guide" id="btnCatGuide" title="Category Guide">&#8505;</button>';
                setOutcomesTitle('\uD83C\uDFAF Financial Goals');
            } else {
                document.getElementById('focusTitle').textContent = "TODAY'S POWER FOCUS";
                document.getElementById('wheelTitle').innerHTML = '';
                setOutcomesTitle('\uD83C\uDFAF Your Outcomes');
            }

            // Update category filters
            renderCategoryFilters();

            // Re-render everything
            render();
        } catch (err) {
            console.error('Error switching mode:', err);
        }
    }

    function catBtnLabel(name) {
        var lines = name.split('\n');
        if (lines.length > 1) {
            return '<span class="btn-line">' + lines[0] + '</span><span class="btn-line">' + lines[1] + '</span>';
        }
        return name;
    }

    function renderNewOutcomeCategoryPills() {
        var cats = getActiveCategories();
        var container = document.querySelector('.category-pills:not(.edit-category-pills)');
        if (!container) return;
        container.innerHTML = cats.map(function(c, i) {
            var activeClass = i === 0 ? ' active' : '';
            return '<button class="pill' + activeClass + '" data-category="' + c.id + '" style="--pill-color:' + c.color + '">' + catBtnLabel(c.name) + '</button>';
        }).join('');
        // Re-attach click handlers
        container.querySelectorAll('.pill').forEach(function(pill) {
            pill.addEventListener('click', function() {
                container.querySelectorAll('.pill').forEach(function(p) { p.classList.remove('active'); });
                this.classList.add('active');
            });
        });
    }

    function buildExtraCatOptions() {
        var cats = getActiveCategories();
        return '<option value="">+ Cat</option>' + cats.map(function(c) {
            return '<option value="' + c.id + '">' + catDisplayName(c.name) + '</option>';
        }).join('');
    }

    function populateActionCatDropdowns() {
        var opts = buildExtraCatOptions();
        document.querySelectorAll('#actionsList .action-extra-cat').forEach(function(sel) {
            var current = sel.value;
            sel.innerHTML = opts;
            if (current) sel.value = current;
        });
    }

    function renderCategoryFilters() {
        var cats = getActiveCategories();
        var todayFocus = getTodayFocusCategories();
        var autoFocusCat = todayFocus.length > 0 ? todayFocus[0] : 'all';

        // Auto-set focus filter to today's first focus category
        focusCategoryFilter = autoFocusCat;

        // Focus category filter
        var focusFilter = document.getElementById('focusCategoryFilter');
        focusFilter.innerHTML = '<button class="focus-cat-btn' + (autoFocusCat === 'all' ? ' active' : '') + '" data-focus-cat="all">All</button>' +
            cats.map(function(c) {
                var isActive = (c.id === autoFocusCat) ? ' active' : '';
                return '<button class="focus-cat-btn' + isActive + '" data-focus-cat="' + c.id + '">' + catBtnLabel(c.name) + '</button>';
            }).join('');

        // Unified filter function — syncs both filter rows and re-renders everything
        function applyGlobalCategoryFilter(catId) {
            focusCategoryFilter = catId;
            currentFilter = catId;
            // Sync focus filter row
            focusFilter.querySelectorAll('.focus-cat-btn').forEach(function(b) {
                b.classList.toggle('active', b.dataset.focusCat === catId);
            });
            // Sync outcomes filter row
            var filterTabs = document.getElementById('outcomesFilterTabs');
            filterTabs.querySelectorAll('.tab').forEach(function(t) {
                t.classList.toggle('active', t.dataset.filter === catId);
            });
            // Re-render all filtered sections
            render();
        }

        // Re-attach focus filter click handlers
        focusFilter.querySelectorAll('.focus-cat-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                applyGlobalCategoryFilter(this.dataset.focusCat);
            });
        });

        // Auto-set outcomes filter to today's first focus category
        currentFilter = autoFocusCat;

        // Outcomes filter tabs
        var filterTabs = document.getElementById('outcomesFilterTabs');
        filterTabs.innerHTML = '<button class="tab' + (autoFocusCat === 'all' ? ' active' : '') + '" data-filter="all">All</button>' +
            cats.map(function(c) {
                var isActive = (c.id === autoFocusCat) ? ' active' : '';
                return '<button class="tab' + isActive + '" data-filter="' + c.id + '">' + catBtnLabel(c.name) + '</button>';
            }).join('');

        // Re-attach filter tabs click handlers
        filterTabs.querySelectorAll('.tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                applyGlobalCategoryFilter(this.dataset.filter);
            });
        });
    }

    function getSortedActions(actions, outcome) {
        var list = actions.slice();
        // Sort by leverage score (highest first), done items last
        list.sort(function(a, b) {
            if (a.done !== b.done) return a.done ? 1 : -1;
            if (outcome) {
                var scoreA = calculateLeverageScore(a, outcome);
                var scoreB = calculateLeverageScore(b, outcome);
                if (scoreA !== scoreB) return scoreB - scoreA;
            }
            // Fallback: more categories = higher priority
            var catsA = (a.categories && a.categories.length) || 0;
            var catsB = (b.categories && b.categories.length) || 0;
            return catsB - catsA;
        });
        return list;
    }

    function getNextAction() {
        if (forcedNextAction) return forcedNextAction;
        var candidates = [];
        var now = new Date();
        data.outcomes.forEach(function(o, outcomeIdx) {
            if (o.completed) return;
            if (o.backBurner) return;
            if (!isOutcomeInCurrentMode(o)) return;
            if (focusCategoryFilter !== 'all' && o.category !== focusCategoryFilter) return;
            var foundFirst = false;
            o.actions.forEach(function(a) {
                if (a.done) return;
                if (foundFirst) return; // only first undone action per outcome
                foundFirst = true;
                var score = calculateLeverageScore(a, o);
                // Calculate days until deadline (lower = more urgent)
                var deadline = a.deadline || o.deadline || null;
                var daysLeft = 9999; // no deadline = lowest urgency
                if (deadline) {
                    daysLeft = Math.ceil((new Date(deadline) - now) / (1000 * 60 * 60 * 24));
                }
                candidates.push({ text: a.text, outcome: o.result, outcomeId: o.id, actionId: a.id, estMinutes: a.estMinutes || 15, category: o.category, leverageScore: score, outcomeIdx: outcomeIdx, daysLeft: daysLeft });
            });
        });
        // Sort: closest deadline first, then highest leverage, then leftmost outcome
        candidates.sort(function(a, b) {
            if (a.daysLeft !== b.daysLeft) return a.daysLeft - b.daysLeft;
            if (b.leverageScore !== a.leverageScore) return b.leverageScore - a.leverageScore;
            return a.outcomeIdx - b.outcomeIdx;
        });
        return candidates[0] || null;
    }

    function getBestActionForTime(availableMinutes) {
        var candidates = [];

        data.outcomes.forEach(function(o) {
            if (o.completed) return;
            if (o.backBurner) return;
            if (!isOutcomeInCurrentMode(o)) return;
            o.actions.forEach(function(a) {
                if (a.done) return;
                // Only include actions that fit in available time
                var est = a.estMinutes || 15; // Default to 15 if not set
                if (est <= availableMinutes) {
                    var leverageScore = calculateLeverageScore(a, o);
                    candidates.push({
                        text: a.text,
                        outcome: o.result,
                        outcomeId: o.id,
                        actionId: a.id,
                        estMinutes: a.estMinutes,
                        category: o.category,
                        leverageScore: leverageScore
                    });
                }
            });
        });

        // Sort by leverage score (highest first)
        candidates.sort(function(a, b) {
            return b.leverageScore - a.leverageScore;
        });

        return candidates[0] || null;
    }

    // Pick from least-used category — cycles through on repeated clicks
    var pickForMeCycleIndex = 0;
    var pickForMeLastSortedCats = null;

    function pickFromLeastUsedCategory() {
        var today = new Date().toDateString();
        var activeCats = getActiveCategories();

        // Count today's completions per category
        var catCounts = {};
        activeCats.forEach(function(c) { catCounts[c.id] = 0; });
        var allOutcomes = data.outcomes.concat(data.archived || []);
        allOutcomes.forEach(function(o) {
            if (!catCounts.hasOwnProperty(o.category)) return;
            o.actions.forEach(function(a) {
                if (a.done && a.completedDate === today) catCounts[o.category]++;
            });
        });

        // Sort categories by usage (least used first)
        var sortedCats = Object.keys(catCounts)
            .sort(function(a, b) { return catCounts[a] - catCounts[b]; });

        // Only keep categories that have available tasks
        var catsWithTasks = sortedCats.filter(function(cat) {
            for (var j = 0; j < data.outcomes.length; j++) {
                var o = data.outcomes[j];
                if (o.completed || o.backBurner || !isOutcomeInCurrentMode(o)) continue;
                if (o.category !== cat) continue;
                for (var k = 0; k < o.actions.length; k++) {
                    if (!o.actions[k].done) return true;
                }
            }
            return false;
        });

        if (catsWithTasks.length === 0) return null;

        // Reset cycle if categories changed
        var catsKey = catsWithTasks.join(',');
        if (pickForMeLastSortedCats !== catsKey) {
            pickForMeLastSortedCats = catsKey;
            pickForMeCycleIndex = 0;
        }

        // Wrap around
        if (pickForMeCycleIndex >= catsWithTasks.length) {
            pickForMeCycleIndex = 0;
        }

        var targetCat = catsWithTasks[pickForMeCycleIndex];
        pickForMeCycleIndex++;

        // Find first available action in target category
        for (var j = 0; j < data.outcomes.length; j++) {
            var o = data.outcomes[j];
            if (o.completed || o.backBurner || !isOutcomeInCurrentMode(o)) continue;
            if (o.category !== targetCat) continue;
            for (var k = 0; k < o.actions.length; k++) {
                var a = o.actions[k];
                if (a.done) continue;
                return {
                    text: a.text,
                    outcome: o.result,
                    outcomeId: o.id,
                    actionId: a.id,
                    estMinutes: a.estMinutes,
                    category: o.category
                };
            }
        }
        return null;
    }

    var pickedTask = null;

    function showPickForMe() {
        document.getElementById('pickResult').classList.add('hidden');
        document.getElementById('pickForMeOverlay').classList.remove('hidden');
    }

    function pickTaskForTime(minutes) {
        pickedTask = getBestActionForTime(minutes);
        var resultDiv = document.getElementById('pickResult');
        var taskEl = document.getElementById('pickResultTask');
        var metaEl = document.getElementById('pickResultMeta');

        if (pickedTask) {
            taskEl.textContent = pickedTask.text;
            var cat = CATEGORIES.concat(BUSINESS_CATEGORIES).concat(HEALTH_CATEGORIES).concat(FINANCES_CATEGORIES).find(function(c) { return c.id === pickedTask.category; });
            var catName = cat ? catDisplayNameHtml(cat.name) : pickedTask.category;
            var estStr = pickedTask.estMinutes ? pickedTask.estMinutes + ' min' : 'No estimate';

            // Check values alignment
            var outcome = data.outcomes.find(function(o) { return o.id === pickedTask.outcomeId; });
            var purpose = outcome ? outcome.purpose : '';
            var alignment = getValuesAlignmentScore(pickedTask.text, purpose);
            var valuesHtml = '';
            if (alignment.matched.length > 0) {
                valuesHtml = '<div class="pick-values-match">Aligns with: ' +
                    alignment.matched.map(function(v) { return '<span class="pick-value-tag">' + escapeHtml(v) + '</span>'; }).join(' ') +
                    '</div>';
            }

            var leverageHtml = pickedTask.leverageScore !== undefined ? ' | Leverage: ' + pickedTask.leverageScore + '%' : '';
            metaEl.innerHTML = '<span class="pick-category" style="background:' + (cat ? cat.color : '#7c6fba') + '22;color:' + (cat ? cat.color : '#7c6fba') + '">' + catName + '</span> ' + estStr + ' | ' + pickedTask.outcome + leverageHtml + valuesHtml;
            resultDiv.classList.remove('hidden');
            document.getElementById('btnStartPickedTask').style.display = '';
        } else {
            taskEl.textContent = 'No tasks fit in ' + minutes + ' minutes';
            metaEl.textContent = 'Try adding time estimates to your actions, or select more time';
            resultDiv.classList.remove('hidden');
            document.getElementById('btnStartPickedTask').style.display = 'none';
        }
    }

    function startPickedTask() {
        if (!pickedTask) return;
        document.getElementById('pickForMeOverlay').classList.add('hidden');
        // The picked task becomes the focus - we'll start the timer for it
        // Update the current timer task and start
        currentTimerTask = { outcomeId: pickedTask.outcomeId, actionId: pickedTask.actionId };
        startTaskTimer();
    }

    // ==========================================
    //  MY VALUES
    // ==========================================
    function showValuesModal() {
        var inputs = document.querySelectorAll('.value-input');
        inputs.forEach(function(input, i) {
            input.value = (data.values && data.values[i]) ? data.values[i] : '';
        });
        document.getElementById('valuesOverlay').classList.remove('hidden');
    }

    function saveValues() {
        var inputs = document.querySelectorAll('.value-input');
        data.values = [];
        inputs.forEach(function(input) {
            var val = input.value.trim();
            if (val) data.values.push(val);
        });
        saveData();
        document.getElementById('valuesOverlay').classList.add('hidden');
    }

    function getValuesAlignmentScore(taskText, outcomePurpose) {
        if (!data.values || data.values.length === 0) return { score: 0, matched: [] };
        var text = (taskText + ' ' + (outcomePurpose || '')).toLowerCase();
        var matched = [];
        data.values.forEach(function(value) {
            var valueLower = value.toLowerCase();
            // Check if task/outcome contains the value word
            if (text.indexOf(valueLower) !== -1) {
                matched.push(value);
            }
        });
        return { score: matched.length, matched: matched };
    }

    // ==========================================
    //  CATEGORY CHECKBOXES FOR ACTIONS
    // ==========================================
    function renderActionCategoryCheckboxes(containerId, selectedCats) {
        var cats = getActiveCategories();
        var container = document.getElementById(containerId);
        if (!container) return;
        selectedCats = selectedCats || [];
        container.innerHTML = cats.map(function(c) {
            var checked = selectedCats.indexOf(c.id) !== -1 ? ' checked' : '';
            var emoji = c.emoji ? c.emoji + ' ' : '';
            return '<label class="cat-checkbox-label" style="--cat-color:' + c.color + '">' +
                '<input type="checkbox" class="cat-checkbox" value="' + c.id + '"' + checked + '>' +
                '<span class="cat-checkbox-text">' + emoji + catDisplayNameHtml(c.name) + '</span>' +
                '</label>';
        }).join('');
    }

    function getCheckedCategories(containerId) {
        var container = document.getElementById(containerId);
        if (!container) return [];
        var checked = [];
        container.querySelectorAll('.cat-checkbox:checked').forEach(function(cb) {
            checked.push(cb.value);
        });
        return checked;
    }

    // ==========================================
    //  LEVERAGE SCORE SYSTEM
    // ==========================================
    var _cachedWheelScores = null;
    var _wheelScoresCacheTime = 0;

    function getCachedWheelScores() {
        var now = Date.now();
        // Cache for 10 seconds
        if (_cachedWheelScores && (now - _wheelScoresCacheTime) < 10000) {
            return _cachedWheelScores;
        }
        _cachedWheelScores = calculateWheelScores();
        _wheelScoresCacheTime = now;
        return _cachedWheelScores;
    }

    function calculateLeverageScore(action, outcome) {
        var wheelScores = getCachedWheelScores();
        var actionCats = (action.categories && action.categories.length > 0) ? action.categories : [outcome.category];

        // Deadline urgency (25%): actions with closer deadlines score higher
        var deadlineUrgency = 0.5; // default if no deadline
        var actionDeadline = action.deadline || (outcome.deadline || null);
        if (actionDeadline) {
            var now = new Date();
            var dl = new Date(actionDeadline);
            var daysLeft = Math.ceil((dl - now) / (1000 * 60 * 60 * 24));
            if (daysLeft <= 0) deadlineUrgency = 1.0;       // overdue = max urgency
            else if (daysLeft <= 1) deadlineUrgency = 0.95;
            else if (daysLeft <= 3) deadlineUrgency = 0.85;
            else if (daysLeft <= 7) deadlineUrgency = 0.7;
            else if (daysLeft <= 14) deadlineUrgency = 0.5;
            else deadlineUrgency = 0.3;
        }

        // Wheel weakness (25%): average weakness across all impacted categories
        var totalWeakness = 0;
        actionCats.forEach(function(catId) {
            var catScore = 5;
            wheelScores.forEach(function(ws) {
                if (ws.id === catId) catScore = ws.score;
            });
            totalWeakness += (10 - catScore) / 10;
        });
        var wheelWeakness = totalWeakness / actionCats.length;

        // Category coverage (20%): more categories = higher score
        var totalCats = getActiveCategories().length || 8;
        var categoryCoverage = Math.min(actionCats.length / totalCats * 2.5, 1); // 3+ cats = max

        // Values alignment (10%)
        var alignment = getValuesAlignmentScore(action.text, outcome.purpose);
        var totalValues = (data.values && data.values.length > 0) ? data.values.length : 1;
        var valuesAlignment = Math.min(alignment.score / totalValues, 1);

        // Time efficiency (10%): shorter tasks score higher
        var est = action.estMinutes || 30;
        var timeEfficiency;
        if (est <= 15) timeEfficiency = 1.0;
        else if (est <= 30) timeEfficiency = 0.8;
        else if (est <= 60) timeEfficiency = 0.6;
        else if (est <= 120) timeEfficiency = 0.4;
        else timeEfficiency = 0.2;

        // Daily focus (10%): bonus if any impacted category is in today's focus
        var focusCats = getTodayFocusCategories();
        var dailyFocusBoost = 0;
        actionCats.forEach(function(catId) {
            if (focusCats.indexOf(catId) !== -1) dailyFocusBoost = 1.0;
        });

        // Calculate final score (0-100)
        var score = Math.round(
            (deadlineUrgency * 0.25 +
             wheelWeakness * 0.25 +
             categoryCoverage * 0.20 +
             valuesAlignment * 0.10 +
             timeEfficiency * 0.10 +
             dailyFocusBoost * 0.10) * 100
        );

        return Math.max(0, Math.min(100, score));
    }

    function renderNextAction() {
        var next = getNextAction();
        var textEl = document.getElementById('nextActionText');
        var metaEl = document.getElementById('nextActionMeta');
        var btnComplete = document.getElementById('btnCompleteNext');
        var btnPomo = document.getElementById('btnStartPomodoro');
        var btnStartTimer = document.getElementById('btnStartTaskTimer');
        var progressEl = document.getElementById('nextActionOutcomeProgress');

        if (next) {
            textEl.textContent = next.text;
            // Build meta with "From Goal" in bold and "Your WHY?" with purpose
            var outcome = data.outcomes.find(function(o) { return o.id === next.outcomeId; });
            var metaHtml = '<span class="na-from-goal"><strong>From Goal:</strong> ' + escapeHtml(next.outcome) + '</span>';
            if (outcome && outcome.purpose) {
                metaHtml += '<span class="na-why"><strong>Your WHY?</strong> ' + escapeHtml(outcome.purpose) + '</span>';
            }
            if (next.estMinutes) {
                metaHtml += '<span class="na-est">~' + next.estMinutes + ' min est.</span>';
            }
            metaEl.innerHTML = metaHtml;
            btnComplete.style.display = '';
            if (btnPomo) btnPomo.style.display = '';
            if (btnStartTimer) btnStartTimer.style.display = taskTimerActive ? 'none' : '';
            // Show pick-for-me, hide create outcome
            var pickBtn = document.getElementById('btnPickForMe');
            if (pickBtn) pickBtn.style.display = '';
            var createBtn = document.getElementById('btnCreateOutcomeNext');
            if (createBtn) createBtn.style.display = 'none';
            btnComplete.dataset.outcomeId = next.outcomeId;
            btnComplete.dataset.actionId = next.actionId;

            // Show outcome action progress
            var outcome = data.outcomes.find(function(o) { return o.id === next.outcomeId; });
            if (outcome && progressEl) {
                var done = outcome.actions.filter(function(a) { return a.done; }).length;
                var total = outcome.actions.length;
                var pct = total > 0 ? Math.round((done / total) * 100) : 0;
                progressEl.innerHTML = '<span class="na-progress-text">' + done + ' of ' + total + ' steps done</span>' +
                    '<div class="na-progress-bar"><div class="na-progress-fill" style="width:' + pct + '%"></div></div>';
            }
        } else {
            textEl.textContent = 'All done! Ready for a new goal?';
            metaEl.textContent = '';
            btnComplete.style.display = 'none';
            if (btnPomo) btnPomo.style.display = 'none';
            if (btnStartTimer) btnStartTimer.style.display = 'none';
            if (progressEl) progressEl.innerHTML = '';
            // Show "Create New Outcome" button instead of pick-for-me
            var pickBtn = document.getElementById('btnPickForMe');
            if (pickBtn) pickBtn.style.display = 'none';
            var createBtn = document.getElementById('btnCreateOutcomeNext');
            if (createBtn) createBtn.style.display = 'inline-flex';

            // Stop timer if no more actions
            if (taskTimerActive) {
                stopTaskTimer();
            }
        }
    }

    function renderOutcomes() {
        var grid = document.getElementById('outcomesGrid');
        grid.innerHTML = '';
        // Filter by current mode first
        var filtered = data.outcomes.filter(function(o) { return isOutcomeInCurrentMode(o); });
        // Then filter by category if selected
        if (currentFilter !== 'all') {
            filtered = filtered.filter(function(o) { return o.category === currentFilter; });
        }
        // Sort: back burner outcomes go to the bottom
        filtered.sort(function(a, b) {
            var aBB = a.backBurner ? 1 : 0;
            var bBB = b.backBurner ? 1 : 0;
            return aBB - bBB;
        });

        // Insert collapsible back-burner toggle
        var bbCount = filtered.filter(function(o) { return o.backBurner; }).length;
        var bbToggleInserted = false;
        var bbCollapsed = localStorage.getItem('bb_collapsed') === '1';

        filtered.forEach(function(outcome) {
            // Insert back-burner toggle header before first back-burner outcome
            if (outcome.backBurner && !bbToggleInserted && bbCount > 0) {
                bbToggleInserted = true;
                var toggle = document.createElement('div');
                toggle.className = 'bb-toggle-header' + (bbCollapsed ? ' collapsed' : '');
                toggle.innerHTML = '<span class="bb-toggle-arrow">' + (bbCollapsed ? '&#9654;' : '&#9660;') + '</span> &#9208; Back Burner <span class="bb-toggle-count">(' + bbCount + ')</span>';
                toggle.addEventListener('click', function() {
                    var isNowCollapsed = !toggle.classList.contains('collapsed');
                    toggle.classList.toggle('collapsed');
                    toggle.querySelector('.bb-toggle-arrow').innerHTML = isNowCollapsed ? '&#9654;' : '&#9660;';
                    localStorage.setItem('bb_collapsed', isNowCollapsed ? '1' : '0');
                    grid.querySelectorAll('.outcome-card.back-burner').forEach(function(card) {
                        card.style.display = isNowCollapsed ? 'none' : '';
                    });
                });
                grid.appendChild(toggle);
            }
            var card = document.createElement('div');
            card.className = 'outcome-card' + (outcome.completed ? ' completed' : '') + (outcome.backBurner ? ' back-burner' : '');
            card.dataset.category = outcome.category;
            card.dataset.outcomeId = outcome.id;
            // Get category color from active categories
            var activeCats = getActiveCategories();
            var cat = activeCats.find(function(c) { return c.id === outcome.category; });
            if (!cat) cat = CATEGORIES.concat(BUSINESS_CATEGORIES).concat(HEALTH_CATEGORIES).concat(FINANCES_CATEGORIES).find(function(c) { return c.id === outcome.category; });
            var catColor = cat ? cat.color : '#7c6fba';
            var catName = cat ? catDisplayNameHtml(cat.name) : outcome.category;
            card.style.borderLeftColor = catColor;
            card.style.background = 'linear-gradient(135deg, ' + catColor + '08, ' + catColor + '04, transparent)';
            var sortedActions = getSortedActions(outcome.actions, outcome);
            var doneCount = outcome.actions.filter(function(a) { return a.done; }).length;
            var totalCount = outcome.actions.length;
            var pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

            var deadlineStr = '';
            if (outcome.deadline) {
                var dl = new Date(outcome.deadline);
                var now = new Date();
                var diffDays = Math.ceil((dl - now) / (1000 * 60 * 60 * 24));
                if (diffDays < 0) {
                    deadlineStr = '<span class="outcome-deadline urgent">Overdue by ' + Math.abs(diffDays) + 'd</span>';
                } else if (diffDays <= 3) {
                    deadlineStr = '<span class="outcome-deadline urgent">' + diffDays + 'd left</span>';
                } else {
                    deadlineStr = '<span class="outcome-deadline">' + diffDays + 'd left</span>';
                }
            }

            var incompleteHtml = '';
            var completedHtml = '';
            sortedActions.forEach(function(a) {
                var estStr = '<span class="action-est">' + (a.estMinutes || 15) + 'm</span>';
                var deadlineBadge = '';
                if (!a.done && a.deadline) {
                    var dlDate = new Date(a.deadline);
                    var nowDate = new Date();
                    var dlDays = Math.ceil((dlDate - nowDate) / (1000 * 60 * 60 * 24));
                    if (dlDays < 0) {
                        deadlineBadge = '<span class="action-deadline-badge overdue" title="Overdue">' + Math.abs(dlDays) + 'd overdue</span>';
                    } else if (dlDays <= 1) {
                        deadlineBadge = '<span class="action-deadline-badge urgent" title="Due today/tomorrow">today</span>';
                    } else if (dlDays <= 3) {
                        deadlineBadge = '<span class="action-deadline-badge urgent" title="Due in ' + dlDays + ' days">' + dlDays + 'd</span>';
                    } else if (dlDays <= 7) {
                        deadlineBadge = '<span class="action-deadline-badge soon" title="Due in ' + dlDays + ' days">' + dlDays + 'd</span>';
                    } else {
                        deadlineBadge = '<span class="action-deadline-badge" title="Due in ' + dlDays + ' days">' + dlDays + 'd</span>';
                    }
                }
                var leverageScore = a.done ? '' : calculateLeverageScore(a, outcome);
                var leverageBadge = '';
                if (!a.done && leverageScore !== '') {
                    var badgeClass = leverageScore >= 60 ? 'leverage-high' : leverageScore >= 30 ? 'leverage-mid' : 'leverage-low';
                    leverageBadge = '<span class="leverage-badge ' + badgeClass + '">' + leverageScore + '</span>';
                }
                var catCountBadge = '';
                var actionCatCount = (a.categories && a.categories.length > 0) ? a.categories.length : 0;
                if (!a.done && actionCatCount > 1) {
                    catCountBadge = '<span class="cat-count-badge" title="Impacts ' + actionCatCount + ' categories">' + actionCatCount + ' cats</span>';
                }
                var focusBtn = '';
                if (!a.done) {
                    focusBtn = '<button class="btn-focus-action" data-outcome-id="' + outcome.id + '" data-action-id="' + a.id + '" title="Focus on this action">&#9201;</button>';
                }
                var li = '<li class="draggable" draggable="true" data-action-id="' + a.id + '" data-outcome-id="' + outcome.id + '">' +
                    '<span class="drag-handle">&#9776;</span>' +
                    '<input type="checkbox" class="action-checkbox" data-outcome-id="' + outcome.id + '" data-action-id="' + a.id + '"' + (a.done ? ' checked' : '') + '>' +
                    '<span class="action-text' + (a.done ? ' done' : '') + '" data-outcome-id="' + outcome.id + '" data-action-id="' + a.id + '">' + escapeHtml(a.text) + '</span>' +
                    deadlineBadge +
                    catCountBadge +
                    leverageBadge +
                    estStr +
                    focusBtn +
                    '</li>';
                if (a.done) {
                    completedHtml += li;
                } else {
                    incompleteHtml += li;
                }
            });

            var actionsHtml = incompleteHtml;
            var completedSection = '';
            if (doneCount > 0) {
                completedSection =
                    '<div class="completed-actions-toggle" data-outcome-id="' + outcome.id + '">' +
                        '<span class="toggle-arrow">&#9654;</span> ' + doneCount + ' completed action' + (doneCount > 1 ? 's' : '') +
                    '</div>' +
                    '<ul class="outcome-actions-list completed-actions-group hidden" data-outcome-id="' + outcome.id + '">' + completedHtml + '</ul>';
            }

            var archiveBtn = outcome.completed ? '<button class="btn-archive-outcome" data-outcome-id="' + outcome.id + '" title="Archive this outcome">&#128218; Archive</button>' : '';

            card.innerHTML =
                '<div class="outcome-header">' +
                    '<span class="outcome-drag-handle" title="Drag to reorder">&#9776;</span>' +
                    '<div class="outcome-header-left">' +
                        '<span class="outcome-wheel-tag" style="background:' + catColor + '22;color:' + catColor + ';border:1px solid ' + catColor + '44">' + catName + '</span>' +
                        '<div class="outcome-result">' + escapeHtml(outcome.result) + '</div>' +
                    '</div>' +
                    '<div class="outcome-header-btns">' +
                        '<button class="outcome-btn btn-back-burner" data-outcome-id="' + outcome.id + '" title="' + (outcome.backBurner ? 'Resume outcome' : 'Put on back burner') + '">' + (outcome.backBurner ? '&#9654;' : '&#9208;') + '</button>' +
                        '<button class="outcome-btn btn-add-action-to" data-outcome-id="' + outcome.id + '" title="Add action">+</button>' +
                        '<button class="outcome-btn btn-edit-outcome" data-outcome-id="' + outcome.id + '" title="Edit outcome">&#9998;</button>' +
                        '<button class="outcome-btn btn-delete-outcome" data-outcome-id="' + outcome.id + '" title="Delete outcome">&#128465;</button>' +
                    '</div>' +
                '</div>' +
                '<div class="outcome-purpose"><span class="purpose-label-tag">Why this matters:</span> ' + escapeHtml(outcome.purpose) + '</div>' +
                '<ul class="outcome-actions-list">' + actionsHtml + '</ul>' +
                completedSection +
                '<div class="outcome-footer">' +
                    '<div class="outcome-progress">' +
                        '<div class="outcome-progress-bar"><div class="outcome-progress-fill" style="width:' + pct + '%;background:' + catColor + '"></div></div>' +
                        '<span>' + doneCount + '/' + totalCount + '</span>' +
                    '</div>' +
                    deadlineStr +
                    archiveBtn +
                '</div>';
            if (outcome.backBurner && bbCollapsed) {
                card.style.display = 'none';
            }
            grid.appendChild(card);
        });

        // Drag and drop (actions within outcomes)
        setupDragDrop();
        // Drag and drop (outcome cards)
        setupOutcomeDragDrop();
    }

    function renderMomentum() {
        // Calculate mode-specific momentum from log entries
        var activeCatIds = getActiveCategories().map(function(c) { return c.id; });
        var modeMomentum = 0;
        data.log.forEach(function(entry) {
            if (entry.category && activeCatIds.indexOf(entry.category) !== -1) {
                modeMomentum += entry.points || 0;
            }
        });
        // Add outcome completion bonuses for mode outcomes
        var modeOutcomes = data.outcomes.filter(function(o) { return isOutcomeInCurrentMode(o); });
        modeOutcomes.forEach(function(o) {
            if (o.completed) modeMomentum += 100;
        });
        document.getElementById('totalMomentum').textContent = modeMomentum;
        var completed = modeOutcomes.filter(function(o) { return o.completed; }).length;
        document.getElementById('outcomesCompleted').textContent = completed;
        var totalActions = 0;
        modeOutcomes.forEach(function(o) {
            o.actions.forEach(function(a) { if (a.done) totalActions++; });
        });
        document.getElementById('totalActions').textContent = totalActions;
        document.getElementById('bestStreak').textContent = data.bestStreak;
    }

    function renderLog() {
        var logEl = document.getElementById('actionLog');
        // Always show ALL categories in action log regardless of filter
        var allCatIds = getActiveCategories().map(function(c) { return c.id; });
        var modeLog = data.log.filter(function(entry) {
            return entry.category && allCatIds.indexOf(entry.category) !== -1;
        });
        if (modeLog.length === 0) {
            logEl.innerHTML = '<p class="empty-state">Your completed actions will appear here. Start by creating an outcome above!</p>';
            return;
        }
        // Filter to last 7 calendar days (matches Wheel of Life rolling window)
        var validDays = {};
        for (var d = 0; d < 7; d++) {
            var dayDate = new Date(Date.now() - d * 86400000);
            validDays[dayDate.toDateString()] = true;
        }
        var recent = modeLog.filter(function(entry) {
            if (!entry.date) return false;
            return validDays[entry.date] === true;
        }).reverse();

        // Group by date
        var groups = {};
        var groupOrder = [];
        recent.forEach(function(entry) {
            var key = entry.date || 'Unknown';
            if (!groups[key]) {
                groups[key] = [];
                groupOrder.push(key);
            }
            groups[key].push(entry);
        });

        var today = new Date().toDateString();
        var yesterday = new Date(Date.now() - 86400000).toDateString();

        var html = '';
        groupOrder.forEach(function(dateKey) {
            var label = dateKey;
            if (dateKey === today) label = 'Today';
            else if (dateKey === yesterday) label = 'Yesterday';
            else {
                var d = new Date(dateKey);
                if (!isNaN(d.getTime())) {
                    label = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                }
            }

            // Calculate total time spent for this day
            var dayTotalMinutes = 0;
            groups[dateKey].forEach(function(entry) {
                if (entry.actualMinutes) {
                    dayTotalMinutes += entry.actualMinutes;
                }
            });
            var dayTotalStr = '';
            if (dayTotalMinutes > 0) {
                if (dayTotalMinutes >= 60) {
                    var hours = Math.floor(dayTotalMinutes / 60);
                    var mins = dayTotalMinutes % 60;
                    dayTotalStr = '<span class="log-day-total">' + hours + 'h ' + mins + 'm total</span>';
                } else {
                    dayTotalStr = '<span class="log-day-total">' + dayTotalMinutes + 'm total</span>';
                }
            }

            html += '<div class="log-day-header">' + label + dayTotalStr + '</div>';
            groups[dateKey].forEach(function(entry) {
                var actualTimeStr = entry.actualMinutes ? '<span class="log-actual-time">' + entry.actualMinutes + 'm</span>' : '';

                // Get category info for the label
                var categoryLabel = '';
                if (entry.category) {
                    var cat = CATEGORIES.concat(BUSINESS_CATEGORIES).concat(HEALTH_CATEGORIES).concat(FINANCES_CATEGORIES).find(function(c) { return c.id === entry.category; });
                    if (cat) {
                        categoryLabel = '<span class="log-category" style="background:' + cat.color + '22;color:' + cat.color + ';border-color:' + cat.color + '44">' + catDisplayNameHtml(cat.name) + '</span>';
                    }
                }

                var logIdx = data.log.indexOf(entry);
                html += '<div class="log-entry">' +
                    '<span class="log-check">&#10003;</span>' +
                    '<span class="log-time">' + entry.time + '</span>' +
                    categoryLabel +
                    '<span class="log-text">' + escapeHtml(entry.text) + '</span>' +
                    actualTimeStr +
                    '<span class="log-points">+' + entry.points + '</span>' +
                    '<button class="btn-log-repeat" data-log-idx="' + logIdx + '" title="Do this again">&#128257;</button>' +
                    '</div>';
            });
        });
        logEl.innerHTML = html;

        // Wire up duplicate buttons
        logEl.querySelectorAll('.btn-log-repeat').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var idx = parseInt(this.dataset.logIdx);
                var entry = data.log[idx];
                if (entry) {
                    duplicateActionFromLog(entry.text, entry.category);
                }
            });
        });
    }

    function duplicateActionFromLog(text, category) {
        // Find the first active (non-completed) outcome in the same category
        var target = data.outcomes.find(function(o) {
            return o.category === category && !o.completed;
        });
        if (!target) {
            alert('No active outcome in this category. Create one first!');
            return;
        }
        // Add as a new incomplete action
        target.actions.push({
            id: uid(),
            text: text,
            categories: [category],
            estMinutes: 15,
            deadline: null,
            done: false,
            completedDate: null
        });
        saveData();
        render();
        // Quick feedback toast
        var banner = document.getElementById('praiseBanner');
        var textEl = document.getElementById('praiseText');
        if (banner && textEl) {
            textEl.textContent = '🔁 Action duplicated! Ready to crush it again.';
            banner.classList.remove('hidden');
            banner.classList.add('praise-animate');
            setTimeout(function() { banner.classList.add('praise-fade-out'); setTimeout(function() { banner.classList.add('hidden'); banner.classList.remove('praise-animate', 'praise-fade-out'); }, 800); }, 3000);
        }
    }

    function renderDailyProgress() {
        // Stats bar: reuse weekly power score data
        var current = calculateWeeklyPowerScore(0);
        var last = calculateWeeklyPowerScore(1);
        var diffText = '';
        if (last.score > 0 && last.actions > 0) {
            if (current.score > last.score) {
                diffText = '<span class="pwr-stat pwr-stat-beat">\u{1F525} Beating last week!</span>';
            } else {
                diffText = '<span class="pwr-stat pwr-stat-chase">\u25B2 ' + (last.score - current.score) + ' to beat last wk</span>';
            }
        }
        document.getElementById('dailyProgressText').innerHTML =
            '<strong>Accomplished:</strong> ' +
            '<span class="pwr-stat pwr-stat-actions">\u2705 ' + current.actions + ' actions</span>' +
            '<span class="pwr-stat pwr-stat-cats">\u{1F308} ' + current.categories + ' categories</span>' +
            '<span class="pwr-stat pwr-stat-streak">\u{1F525} ' + current.streakDays + 'd streak</span>' +
            diffText;
    }

    // ==========================================
    //  WHEEL OF LIFE
    // ==========================================
    function renderWheelOfLife() {
        // Always render Victories Today regardless of Pro status
        renderBalanceScore();

        var wheelSection = document.querySelector('.wheel-of-life-card');
        if (!isProUser()) {
            if (wheelSection) {
                // Add lock overlay on wheel chart only (not Victories)
                var chartContainer = wheelSection.querySelector('.wheel-chart-container');
                var lockId = 'wheelProLock';
                var existing = document.getElementById(lockId);
                if (!existing && chartContainer) {
                    var lockDiv = document.createElement('div');
                    lockDiv.id = lockId;
                    lockDiv.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(10,10,30,0.85);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:10;border-radius:inherit;cursor:pointer';
                    lockDiv.innerHTML = '<div style="font-size:2rem;margin-bottom:8px">\u{1F512}</div><p style="font-size:0.85rem;color:var(--text-muted)">Wheel of Life</p><span class="pro-lock-badge">PRO</span><p style="font-size:0.75rem;color:var(--text-muted);margin-top:8px;text-decoration:underline">Upgrade to unlock</p>';
                    lockDiv.onclick = function() { document.getElementById('upgradeOverlay').classList.remove('hidden'); };
                    chartContainer.style.position = 'relative';
                    chartContainer.appendChild(lockDiv);
                }
            }
            return;
        }
        // Remove lock overlay if it exists (user upgraded)
        var lockOverlay = document.getElementById('wheelProLock');
        if (lockOverlay) lockOverlay.remove();
        var scores;
        if (currentMode === 'business') scores = calculateBusinessWheelScores();
        else if (currentMode === 'health') scores = calculateHealthWheelScores();
        else if (currentMode === 'finances') scores = calculateFinancesWheelScores();
        else scores = calculateWheelScores();
        drawRadarChart(scores);
        // Make wheel category labels clickable — filter by category
        var svg = document.getElementById('wheelChart');
        if (svg) {
            svg.querySelectorAll('.wheel-cat-label').forEach(function(label) {
                label.addEventListener('click', function() {
                    var catId = this.getAttribute('data-cat-id');
                    if (catId) {
                        var focusBtn = document.querySelector('.focus-cat-btn[data-focus-cat="' + catId + '"]');
                        if (focusBtn) focusBtn.click();
                    }
                });
            });
        }
    }

    function calculateWheelScores() {
        var now = new Date();
        var weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        var activeCats = getActiveCategories();
        var catPoints = {};
        activeCats.forEach(function(c) { catPoints[c.id] = 0; });

        data.outcomes.forEach(function(o) {
            var cat = o.category;
            if (!catPoints.hasOwnProperty(cat)) return;
            o.actions.forEach(function(a) {
                if (!a.done || !a.completedDate) return;
                var completedDate = new Date(a.completedDate);
                if (completedDate < weekAgo) return;
                var actionCats = (a.categories && a.categories.length > 0) ? a.categories : [cat];
                // Credit 1 point to the outcome's category
                catPoints[cat] += 1;
                // Also credit 1 point to each additional category the action impacts
                actionCats.forEach(function(ac) {
                    if (ac !== cat && catPoints.hasOwnProperty(ac)) {
                        catPoints[ac] += 1;
                    }
                });
            });
        });

        return activeCats.map(function(c) {
            var raw = catPoints[c.id];
            // Score 1 = baseline (no tasks). 1 completed task = score 2, etc.
            var score = raw === 0 ? 1 : Math.min(10, 1 + raw);
            var emoji = c.emoji || '';
            return { id: c.id, name: c.name, color: c.color, emoji: emoji, score: score, rawPoints: raw };
        });
    }

    function drawRadarChart(scores) {
        var svg = document.getElementById('wheelChart');
        var vw = currentMode === 'business' ? 500 : 460;
        var cxVal = currentMode === 'business' ? 250 : 230;
        svg.setAttribute('viewBox', '0 0 ' + vw + ' 460');
        var cx = cxVal, cy = 230, maxR = 160;
        var n = scores.length;
        var polygonColor = currentMode === 'business' ? '#c07a73' : currentMode === 'health' ? '#5a9ab0' : currentMode === 'finances' ? '#b08858' : '#7c6fba';
        var html = '';

        // Grid circles
        for (var r = 1; r <= 5; r++) {
            var radius = (r / 5) * maxR;
            html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + radius + '" fill="none" stroke="rgba(148,163,184,0.25)" stroke-width="1.5"/>';
        }

        // Axis lines and labels
        scores.forEach(function(s, i) {
            var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
            var x2 = cx + maxR * Math.cos(angle);
            var y2 = cy + maxR * Math.sin(angle);
            html += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x2 + '" y2="' + y2 + '" stroke="rgba(148,163,184,0.2)" stroke-width="1"/>';
            var labelOffset = 40;
            var lx = cx + (maxR + labelOffset) * Math.cos(angle);
            var ly = cy + (maxR + labelOffset) * Math.sin(angle);
            var anchor = 'middle';
            if (lx < cx - 10) anchor = 'end';
            else if (lx > cx + 10) anchor = 'start';
            var lines = s.name.split('\n');
            html += '<text x="' + lx + '" y="' + ly + '" text-anchor="' + anchor + '" fill="' + s.color + '" font-size="15" font-weight="600" class="wheel-cat-label" data-cat-id="' + s.id + '" style="cursor:pointer">';
            if (lines.length > 1) {
                html += '<tspan x="' + lx + '" dy="-8">' + lines[0] + '</tspan>';
                html += '<tspan x="' + lx + '" dy="16">' + lines[1] + '</tspan>';
            } else {
                html += '<tspan dominant-baseline="middle">' + lines[0] + '</tspan>';
            }
            html += '</text>';
        });

        // Data polygon
        var points = scores.map(function(s, i) {
            var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
            var r = (s.score / 10) * maxR;
            return (cx + r * Math.cos(angle)) + ',' + (cy + r * Math.sin(angle));
        }).join(' ');
        var polyFill = currentMode === 'business' ? 'rgba(231,76,60,0.2)' : currentMode === 'health' ? 'rgba(0,184,212,0.2)' : currentMode === 'finances' ? 'rgba(230,126,34,0.2)' : 'rgba(108,92,231,0.2)';
        html += '<polygon points="' + points + '" fill="' + polyFill + '" stroke="' + polygonColor + '" stroke-width="2"/>';

        // Data points
        scores.forEach(function(s, i) {
            var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
            var r = (s.score / 10) * maxR;
            var px = cx + r * Math.cos(angle);
            var py = cy + r * Math.sin(angle);
            html += '<circle cx="' + px + '" cy="' + py + '" r="5" fill="' + s.color + '" stroke="#0a0a0f" stroke-width="2"/>';
        });

        svg.innerHTML = html;
    }

    function renderWheelLegend(scores) {
        var legend = document.getElementById('wheelLegend');
        legend.innerHTML = scores.map(function(s) {
            return '<div class="wheel-legend-item">' +
                '<span class="wheel-legend-dot" style="background:' + s.color + '"></span>' +
                '<span>' + catDisplayNameHtml(s.name) + '</span>' +
                '<span class="wheel-legend-value">' + s.score + '</span>' +
                '</div>';
        }).join('');
    }

    function renderBalanceScore() {
        var today = new Date().toDateString();
        var dailyGoal = 9;
        try {
            var savedGoal = parseInt(localStorage.getItem('lwp_victory_goal'));
            if (savedGoal >= 3 && savedGoal <= 21) dailyGoal = savedGoal;
        } catch(e) {}
        var done = 0;
        // Always count ALL categories across ALL modes for Victories Today
        var allOutcomes = data.outcomes.concat(data.archived || []);
        allOutcomes.forEach(function(o) {
            o.actions.forEach(function(a) {
                if (a.done && a.completedDate === today) done++;
            });
        });
        // Also count log entries for today in case completedDate is missing
        var logToday = 0;
        data.log.forEach(function(entry) {
            if (entry.date === today) logToday++;
        });
        if (logToday > done) done = logToday;
        var pct = Math.min(100, Math.round((done / dailyGoal) * 100));

        document.getElementById('balanceCount').textContent = done + ' of ' + dailyGoal;
        var fill = document.getElementById('balanceBarFill');
        fill.style.width = pct + '%';

        var msg;
        if (done === 0) {
            msg = 'Complete actions to claim your victories!';
            fill.style.background = 'linear-gradient(90deg, #c4996a, #b08858)';
        } else if (pct < 30) {
            msg = 'Momentum is building — keep pushing!';
            fill.style.background = 'linear-gradient(90deg, #c4996a, #b08858)';
        } else if (pct < 60) {
            msg = 'You\'re on a roll — don\'t stop now!';
            fill.style.background = 'linear-gradient(90deg, #c4996a, #d4b68a)';
        } else if (pct < 100) {
            msg = 'Almost there — finish strong!';
            fill.style.background = 'linear-gradient(90deg, #6aad99, #6aad99)';
        } else {
            msg = 'ALL VICTORIES CLAIMED — you crushed it!';
            fill.style.background = 'linear-gradient(90deg, #6aad99, #7c6fba)';
        }
        document.getElementById('balanceMessage').textContent = msg;
    }

    // ==========================================
    //  BUSINESS WHEEL
    // ==========================================
    function showBusinessPack() {
        renderBusinessWheel();
        document.getElementById('businessPackOverlay').classList.remove('hidden');
    }

    function calculateBusinessWheelScores() {
        var now = new Date();
        var weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        var catPoints = {};
        BUSINESS_CATEGORIES.forEach(function(c) { catPoints[c.id] = 0; });

        data.outcomes.forEach(function(o) {
            var cat = o.category;
            if (!catPoints.hasOwnProperty(cat)) return;
            o.actions.forEach(function(a) {
                if (!a.done || !a.completedDate) return;
                var completedDate = new Date(a.completedDate);
                if (completedDate < weekAgo) return;
                var actionCats = (a.categories && a.categories.length > 0) ? a.categories : [cat];
                // Credit 1 point to the outcome's category
                catPoints[cat] += 1;
                // Also credit 1 point to each additional category the action impacts
                actionCats.forEach(function(ac) {
                    if (ac !== cat && catPoints.hasOwnProperty(ac)) {
                        catPoints[ac] += 1;
                    }
                });
            });
        });

        return BUSINESS_CATEGORIES.map(function(c) {
            var raw = catPoints[c.id];
            // Score 1 = baseline (no tasks). 1 completed task = score 2, etc.
            var score = raw === 0 ? 1 : Math.min(10, 1 + raw);
            return { id: c.id, name: c.name, color: c.color, emoji: c.emoji, score: score, rawPoints: raw };
        });
    }

    function calculateHealthWheelScores() {
        var now = new Date();
        var weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        var catPoints = {};
        HEALTH_CATEGORIES.forEach(function(c) { catPoints[c.id] = 0; });

        data.outcomes.forEach(function(o) {
            var cat = o.category;
            if (!catPoints.hasOwnProperty(cat)) return;
            o.actions.forEach(function(a) {
                if (!a.done || !a.completedDate) return;
                var completedDate = new Date(a.completedDate);
                if (completedDate < weekAgo) return;
                var actionCats = (a.categories && a.categories.length > 0) ? a.categories : [cat];
                catPoints[cat] += 1;
                actionCats.forEach(function(ac) {
                    if (ac !== cat && catPoints.hasOwnProperty(ac)) {
                        catPoints[ac] += 1;
                    }
                });
            });
        });

        return HEALTH_CATEGORIES.map(function(c) {
            var raw = catPoints[c.id];
            var score = raw === 0 ? 1 : Math.min(10, 1 + raw);
            return { id: c.id, name: c.name, color: c.color, emoji: c.emoji, score: score, rawPoints: raw };
        });
    }

    function calculateFinancesWheelScores() {
        var now = new Date();
        var weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        var catPoints = {};
        FINANCES_CATEGORIES.forEach(function(c) { catPoints[c.id] = 0; });

        data.outcomes.forEach(function(o) {
            var cat = o.category;
            if (!catPoints.hasOwnProperty(cat)) return;
            o.actions.forEach(function(a) {
                if (!a.done || !a.completedDate) return;
                var completedDate = new Date(a.completedDate);
                if (completedDate < weekAgo) return;
                var actionCats = (a.categories && a.categories.length > 0) ? a.categories : [cat];
                catPoints[cat] += 1;
                actionCats.forEach(function(ac) {
                    if (ac !== cat && catPoints.hasOwnProperty(ac)) {
                        catPoints[ac] += 1;
                    }
                });
            });
        });

        return FINANCES_CATEGORIES.map(function(c) {
            var raw = catPoints[c.id];
            var score = raw === 0 ? 1 : Math.min(10, 1 + raw);
            return { id: c.id, name: c.name, color: c.color, emoji: c.emoji, score: score, rawPoints: raw };
        });
    }

    function renderBusinessWheel() {
        var scores = calculateBusinessWheelScores();
        drawBusinessRadarChart(scores);
    }

    function drawBusinessRadarChart(scores) {
        var svg = document.getElementById('businessWheelChart');
        svg.setAttribute('viewBox', '0 0 500 460');
        var cx = 250, cy = 230, maxR = 160;
        var n = scores.length;
        var html = '';

        // Grid circles
        for (var r = 1; r <= 5; r++) {
            var radius = (r / 5) * maxR;
            html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + radius + '" fill="none" stroke="rgba(148,163,184,0.25)" stroke-width="1.5"/>';
        }

        // Axis lines and labels
        scores.forEach(function(s, i) {
            var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
            var x2 = cx + maxR * Math.cos(angle);
            var y2 = cy + maxR * Math.sin(angle);
            html += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x2 + '" y2="' + y2 + '" stroke="rgba(148,163,184,0.2)" stroke-width="1"/>';
            var lx = cx + (maxR + 35) * Math.cos(angle);
            var ly = cy + (maxR + 35) * Math.sin(angle);
            var anchor = 'middle';
            if (lx < cx - 10) anchor = 'end';
            else if (lx > cx + 10) anchor = 'start';
            var lines = s.name.split('\n');
            html += '<text x="' + lx + '" y="' + ly + '" text-anchor="' + anchor + '" fill="' + s.color + '" font-size="12" font-weight="600">';
            if (lines.length > 1) {
                html += '<tspan x="' + lx + '" dy="-7">' + lines[0] + '</tspan>';
                html += '<tspan x="' + lx + '" dy="14">' + lines[1] + '</tspan>';
            } else {
                html += '<tspan dominant-baseline="middle">' + lines[0] + '</tspan>';
            }
            html += '</text>';
        });

        // Data polygon
        var points = scores.map(function(s, i) {
            var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
            var r = (s.score / 10) * maxR;
            return (cx + r * Math.cos(angle)) + ',' + (cy + r * Math.sin(angle));
        }).join(' ');
        html += '<polygon points="' + points + '" fill="rgba(192,122,115,0.2)" stroke="#c07a73" stroke-width="2"/>';

        // Data points
        scores.forEach(function(s, i) {
            var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
            var r = (s.score / 10) * maxR;
            var px = cx + r * Math.cos(angle);
            var py = cy + r * Math.sin(angle);
            html += '<circle cx="' + px + '" cy="' + py + '" r="5" fill="' + s.color + '" stroke="#0a0a0f" stroke-width="2"/>';
        });

        svg.innerHTML = html;
    }

    function renderBusinessWheelLegend(scores) {
        var legend = document.getElementById('businessWheelLegend');
        legend.innerHTML = scores.map(function(s) {
            var trend = s.rawPoints > 3 ? '↑' : s.rawPoints > 1 ? '→' : '↓';
            var trendColor = s.rawPoints > 3 ? '#6aad99' : s.rawPoints > 1 ? '#c4996a' : '#c07a73';
            return '<div class="business-legend-item">' +
                '<span class="business-legend-emoji">' + s.emoji + '</span>' +
                '<span class="business-legend-name">' + catDisplayNameHtml(s.name) + '</span>' +
                '<span class="business-legend-bar"><span class="business-legend-bar-fill" style="width:' + (s.score * 10) + '%;background:' + s.color + '"></span></span>' +
                '<span class="business-legend-score">' + s.score + '/10</span>' +
                '<span class="business-legend-trend" style="color:' + trendColor + '">' + trend + '</span>' +
                '</div>';
        }).join('');
    }

    function openNewBusinessOutcome() {
        // Close business pack modal and open new outcome with business categories
        document.getElementById('businessPackOverlay').classList.add('hidden');
        document.getElementById('newOutcomeOverlay').classList.remove('hidden');
        // Switch to business category mode
        renderBusinessCategoryPills();
        populateActionCatDropdowns();
    }

    function renderBusinessCategoryPills() {
        var container = document.querySelector('.category-pills:not(.edit-category-pills)');
        if (!container) return;
        container.innerHTML = BUSINESS_CATEGORIES.map(function(c, i) {
            var activeClass = i === 0 ? ' active' : '';
            return '<button class="pill' + activeClass + '" data-category="' + c.id + '" style="--pill-color:' + c.color + '">' + catBtnLabel(c.name) + '</button>';
        }).join('');
        // Re-attach click handlers
        container.querySelectorAll('.pill').forEach(function(pill) {
            pill.addEventListener('click', function() {
                container.querySelectorAll('.pill').forEach(function(p) { p.classList.remove('active'); });
                this.classList.add('active');
            });
        });
    }

    // ==========================================
    //  DRAG AND DROP
    // ==========================================
    function setupDragDrop() {
        var items = document.querySelectorAll('.outcome-actions-list li.draggable');
        items.forEach(function(item) {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragover', handleDragOver);
            item.addEventListener('drop', handleDrop);
            item.addEventListener('dragend', handleDragEnd);
            item.addEventListener('dragleave', handleDragLeave);
            // Touch
            item.addEventListener('touchstart', handleTouchStart, { passive: false });
            item.addEventListener('touchmove', handleTouchMove, { passive: false });
            item.addEventListener('touchend', handleTouchEnd);
        });
    }

    var dragSrcEl = null;
    function handleDragStart(e) {
        dragSrcEl = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.dataset.actionId);
    }
    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        this.classList.add('drag-over');
    }
    function handleDragLeave() {
        this.classList.remove('drag-over');
    }
    function handleDrop(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        if (dragSrcEl === this) return;
        var srcOutcomeId = dragSrcEl.dataset.outcomeId;
        var tgtOutcomeId = this.dataset.outcomeId;
        if (srcOutcomeId !== tgtOutcomeId) return;
        var outcome = data.outcomes.find(function(o) { return o.id === srcOutcomeId; });
        if (!outcome) return;
        var srcIdx = outcome.actions.findIndex(function(a) { return a.id === dragSrcEl.dataset.actionId; });
        var tgtIdx = outcome.actions.findIndex(function(a) { return a.id === this.dataset.actionId; }.bind(this));
        if (srcIdx < 0 || tgtIdx < 0) return;
        var item = outcome.actions.splice(srcIdx, 1)[0];
        outcome.actions.splice(tgtIdx, 0, item);
        saveData();
        render();
    }
    function handleDragEnd() {
        this.classList.remove('dragging');
        document.querySelectorAll('.drag-over').forEach(function(el) { el.classList.remove('drag-over'); });
    }

    // Touch DnD
    var touchSrcEl = null, touchClone = null;
    function handleTouchStart(e) {
        var handle = e.target.closest('.drag-handle');
        if (!handle) return;
        e.preventDefault();
        touchSrcEl = this;
        touchClone = this.cloneNode(true);
        touchClone.style.position = 'fixed';
        touchClone.style.opacity = '0.7';
        touchClone.style.pointerEvents = 'none';
        touchClone.style.zIndex = '9999';
        touchClone.style.width = this.offsetWidth + 'px';
        document.body.appendChild(touchClone);
        this.classList.add('dragging');
    }
    function handleTouchMove(e) {
        if (!touchSrcEl) return;
        e.preventDefault();
        var touch = e.touches[0];
        touchClone.style.left = touch.clientX + 'px';
        touchClone.style.top = touch.clientY + 'px';
    }
    function handleTouchEnd(e) {
        if (!touchSrcEl) return;
        if (touchClone && touchClone.parentNode) touchClone.parentNode.removeChild(touchClone);
        var touch = e.changedTouches[0];
        var target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target) {
            var li = target.closest('li.draggable');
            if (li && li !== touchSrcEl && li.dataset.outcomeId === touchSrcEl.dataset.outcomeId) {
                var outcome = data.outcomes.find(function(o) { return o.id === li.dataset.outcomeId; });
                if (outcome) {
                    var srcIdx = outcome.actions.findIndex(function(a) { return a.id === touchSrcEl.dataset.actionId; });
                    var tgtIdx = outcome.actions.findIndex(function(a) { return a.id === li.dataset.actionId; });
                    if (srcIdx >= 0 && tgtIdx >= 0) {
                        var item = outcome.actions.splice(srcIdx, 1)[0];
                        outcome.actions.splice(tgtIdx, 0, item);
                        saveData();
                        render();
                    }
                }
            }
        }
        touchSrcEl.classList.remove('dragging');
        touchSrcEl = null;
        touchClone = null;
    }

    // ==========================================
    //  OUTCOME CARD DRAG AND DROP (mouse/touch based)
    // ==========================================
    var ocDrag = { active: false, srcCard: null, srcId: null, ghost: null, startX: 0, startY: 0, origTop: 0, origLeft: 0 };

    // Uses event delegation - set up once in init(), not per render
    function setupOutcomeDragDrop() {}

    function initOutcomeDragDrop() {
        var grid = document.getElementById('outcomesGrid');

        grid.addEventListener('mousedown', function(e) {
            var handle = e.target.closest('.outcome-drag-handle');
            if (handle) startOutcomeDrag(e, handle);
        });
        grid.addEventListener('touchstart', function(e) {
            var handle = e.target.closest('.outcome-drag-handle');
            if (handle) startOutcomeDrag(e, handle);
        }, { passive: false });
    }

    function startOutcomeDrag(e, handle) {
        e.preventDefault();
        var card = handle.closest('.outcome-card');
        if (!card || !card.dataset.outcomeId) return;

        var point = e.touches ? e.touches[0] : e;
        var rect = card.getBoundingClientRect();

        ocDrag.active = true;
        ocDrag.srcCard = card;
        ocDrag.srcId = card.dataset.outcomeId;
        ocDrag.startX = point.clientX;
        ocDrag.startY = point.clientY;
        ocDrag.origTop = rect.top;
        ocDrag.origLeft = rect.left;

        // Create ghost
        ocDrag.ghost = card.cloneNode(true);
        ocDrag.ghost.style.cssText =
            'position:fixed;left:' + rect.left + 'px;top:' + rect.top + 'px;width:' + rect.width +
            'px;opacity:0.75;pointer-events:none;z-index:9999;transition:none;max-height:130px;overflow:hidden;' +
            'border:2px solid #c4996a;border-radius:12px;background:#1a1a2e;box-shadow:0 8px 15px rgba(196,153,106,0.15);';
        document.body.appendChild(ocDrag.ghost);
        card.classList.add('outcome-dragging');

        document.addEventListener('mousemove', onOutcomeDragMove);
        document.addEventListener('mouseup', onOutcomeDragEnd);
        document.addEventListener('touchmove', onOutcomeDragMove, { passive: false });
        document.addEventListener('touchend', onOutcomeDragEnd);
    }

    function onOutcomeDragMove(e) {
        if (!ocDrag.active) return;
        if (e.cancelable) e.preventDefault();
        var point = e.touches ? e.touches[0] : e;

        // Move ghost to follow cursor
        ocDrag.ghost.style.left = (ocDrag.origLeft + point.clientX - ocDrag.startX) + 'px';
        ocDrag.ghost.style.top = (ocDrag.origTop + point.clientY - ocDrag.startY) + 'px';

        // Highlight target card
        document.querySelectorAll('.outcome-card.outcome-drag-over').forEach(function(el) {
            el.classList.remove('outcome-drag-over');
        });
        var elUnder = document.elementFromPoint(point.clientX, point.clientY);
        if (elUnder) {
            var targetCard = elUnder.closest('.outcome-card');
            if (targetCard && targetCard !== ocDrag.srcCard && targetCard.dataset.outcomeId) {
                targetCard.classList.add('outcome-drag-over');
            }
        }
    }

    function onOutcomeDragEnd(e) {
        if (!ocDrag.active) return;
        document.removeEventListener('mousemove', onOutcomeDragMove);
        document.removeEventListener('mouseup', onOutcomeDragEnd);
        document.removeEventListener('touchmove', onOutcomeDragMove);
        document.removeEventListener('touchend', onOutcomeDragEnd);

        // Clean up ghost
        if (ocDrag.ghost && ocDrag.ghost.parentNode) {
            ocDrag.ghost.parentNode.removeChild(ocDrag.ghost);
        }
        if (ocDrag.srcCard) ocDrag.srcCard.classList.remove('outcome-dragging');

        // Find drop target
        var point = e.changedTouches ? e.changedTouches[0] : e;
        var elUnder = document.elementFromPoint(point.clientX, point.clientY);
        if (elUnder) {
            var targetCard = elUnder.closest('.outcome-card');
            if (targetCard && targetCard !== ocDrag.srcCard && targetCard.dataset.outcomeId) {
                var srcIdx = data.outcomes.findIndex(function(o) { return o.id === ocDrag.srcId; });
                var tgtIdx = data.outcomes.findIndex(function(o) { return o.id === targetCard.dataset.outcomeId; });
                if (srcIdx >= 0 && tgtIdx >= 0) {
                    var item = data.outcomes.splice(srcIdx, 1)[0];
                    data.outcomes.splice(tgtIdx, 0, item);
                    saveData();
                }
            }
        }

        document.querySelectorAll('.outcome-card.outcome-drag-over').forEach(function(el) {
            el.classList.remove('outcome-drag-over');
        });

        ocDrag.active = false;
        ocDrag.srcCard = null;
        ocDrag.srcId = null;
        ocDrag.ghost = null;
        render();
    }

    // ==========================================
    //  EXERCISE & MOVEMENT SYSTEM
    // ==========================================
    function getRandomExercises(count) {
        var shuffled = EXERCISES.slice().sort(function() { return 0.5 - Math.random(); });
        return shuffled.slice(0, count);
    }

    function showMovementBreak() {
        var count = Math.floor(Math.random() * 4) + 1; // 1 to 4
        var exercises = getRandomExercises(count);
        var container = document.getElementById('movementExercises');
        container.innerHTML = exercises.map(function(ex, idx) {
            var focusTags = ex.focus.map(function(f) {
                var label = f === 'arms' ? 'Upper Arms' : f === 'butt' ? 'Glutes' : f === 'core' ? 'Core' : f === 'spine' ? 'Spine/Twist' : f;
                var color = f === 'butt' ? '#7c6fba' : f === 'arms' ? '#6a9dba' : f === 'core' ? '#c4996a' : f === 'spine' ? '#6aad99' : '#7c6fba';
                return '<span class="exercise-focus-tag" style="background:' + color + '22;color:' + color + ';border:1px solid ' + color + '44">' + label + '</span>';
            }).join('');

            var steps = ex.howTo.split('\n').map(function(s) {
                return '<div class="exercise-step">' + escapeHtml(s) + '</div>';
            }).join('');

            return '<div class="exercise-card">' +
                '<div class="exercise-header">' +
                    '<div class="exercise-emoji">' + ex.emoji + '</div>' +
                    '<div class="exercise-info">' +
                        '<div class="exercise-name">' + escapeHtml(ex.name) + '</div>' +
                        '<div class="exercise-meta">' +
                            '<span class="exercise-equipment">' + escapeHtml(ex.equipment) + '</span>' +
                            '<span class="exercise-duration">' + escapeHtml(ex.duration) + '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="exercise-focus-tags">' + focusTags + '</div>' +
                '<div class="exercise-how-to">' +
                    '<div class="exercise-how-title">How to do it:</div>' +
                    steps +
                '</div>' +
                '<label class="exercise-add-checkbox">' +
                    '<input type="checkbox" class="exercise-checkbox" data-exercise-name="' + escapeHtml(ex.name) + '" data-exercise-duration="' + escapeHtml(ex.duration) + '">' +
                    '<span>Add to my Health actions</span>' +
                '</label>' +
            '</div>';
        }).join('');

        document.getElementById('movementTitle').innerHTML = '&#128170; Movement Break! (' + count + ' exercise' + (count > 1 ? 's' : '') + ')';
        document.getElementById('movementOverlay').classList.remove('hidden');
    }

    function addExercisesToHealthOutcome() {
        var checkboxes = document.querySelectorAll('.exercise-checkbox:checked');
        if (checkboxes.length === 0) return;

        // Find or create a Health outcome
        var healthOutcome = data.outcomes.find(function(o) {
            return o.category === 'health_energy' && !o.completed;
        });

        if (!healthOutcome) {
            // Create a new Health outcome for exercises
            healthOutcome = {
                id: uid(),
                result: 'Stay Active & Healthy',
                purpose: 'Maintain my physical health through regular movement and exercise',
                actions: [],
                category: 'health_energy',
                deadline: null,
                commitment: 8,
                completed: false,
                createdDate: new Date().toDateString()
            };
            data.outcomes.push(healthOutcome);
        }

        checkboxes.forEach(function(cb) {
            var name = cb.dataset.exerciseName;
            var duration = cb.dataset.exerciseDuration;
            var actionId = uid();
            var now = new Date();
            healthOutcome.actions.push({
                id: actionId,
                text: name + ' (' + duration + ')',
                categories: ['health_energy'],
                estMinutes: 5,
                done: true,
                completedDate: now.toDateString()
            });

            // Award points + log entry (same as completeAction)
            var points = 15; // base 10 + 5 for 1 category
            data.totalMomentum += points;
            data.log.push({
                text: name + ' (' + duration + ')',
                outcome: healthOutcome.result,
                category: 'health_energy',
                time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                date: now.toDateString(),
                points: points
            });
        });

        // Check if all actions in outcome are now done
        var allDone = healthOutcome.actions.length > 0 && healthOutcome.actions.every(function(a) { return a.done; });
        if (allDone) {
            healthOutcome.completed = true;
            data.totalMomentum += 100;
        }

        saveData();
        render();
        playCompletionAudio();
    }

    function showExtendedBreak() {
        var suggestions = getRandomExercises(3);
        var container = document.getElementById('breakSuggestions');
        container.innerHTML = '<h3 style="margin-bottom:12px;color:#c4996a">Suggested stretches:</h3>' +
            suggestions.map(function(ex) {
                return '<div class="break-suggestion-item">' +
                    '<span>' + ex.emoji + '</span> <strong>' + escapeHtml(ex.name) + '</strong> — ' + escapeHtml(ex.duration) +
                '</div>';
            }).join('');

        document.getElementById('extendedBreakTime').textContent = '10:00';
        document.getElementById('extendedBreakOverlay').classList.remove('hidden');
    }

    function startExtendedBreakTimer() {
        var remaining = 600; // 10 minutes in seconds
        var display = document.getElementById('extendedBreakTime');
        var btn = document.getElementById('btnStartExtendedBreak');
        btn.textContent = 'Timer Running...';
        btn.disabled = true;

        extendedBreakInterval = setInterval(function() {
            remaining--;
            var min = Math.floor(remaining / 60);
            var sec = remaining % 60;
            display.textContent = (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
            if (remaining <= 0) {
                clearInterval(extendedBreakInterval);
                extendedBreakInterval = null;
                display.textContent = "Time's up!";
                btn.textContent = 'Done! Back to Action';
                btn.disabled = false;
                btn.onclick = function() {
                    document.getElementById('extendedBreakOverlay').classList.add('hidden');
                };
            }
        }, 1000);
    }

    // ==========================================
    //  SELF-PRAISE SYSTEM
    // ==========================================
    function showPraise() {
        var praise = SELF_PRAISES[Math.floor(Math.random() * SELF_PRAISES.length)];
        var banner = document.getElementById('praiseBanner');
        var text = document.getElementById('praiseText');
        text.textContent = praise;
        banner.classList.remove('hidden');
        banner.classList.add('praise-animate');

        setTimeout(function() {
            banner.classList.add('praise-fade-out');
            setTimeout(function() {
                banner.classList.add('hidden');
                banner.classList.remove('praise-animate', 'praise-fade-out');
            }, 800);
        }, 5000);
    }

    // ==========================================
    //  COMPLETE ACTION
    // ==========================================
    function uncompleteAction(outcomeId, actionId) {
        var outcome = data.outcomes.find(function(o) { return o.id === outcomeId; });
        if (!outcome) return;
        var action = outcome.actions.find(function(a) { return a.id === actionId; });
        if (!action || !action.done) return;

        action.done = false;
        action.completedDate = null;

        // Reverse points
        var catCount = (action.categories && action.categories.length > 0) ? action.categories.length : 1;
        var points = 10 + (catCount * 5);
        data.totalMomentum = Math.max(0, data.totalMomentum - points);

        // Remove from log (find last matching entry)
        for (var i = data.log.length - 1; i >= 0; i--) {
            if (data.log[i].text === action.text && data.log[i].outcome === outcome.result) {
                data.log.splice(i, 1);
                break;
            }
        }

        // If outcome was completed, reopen it
        if (outcome.completed) {
            outcome.completed = false;
            data.totalMomentum = Math.max(0, data.totalMomentum - 100);
        }

        saveData();
        render();
    }

    function completeAction(outcomeId, actionId) {
        var outcome = data.outcomes.find(function(o) { return o.id === outcomeId; });
        if (!outcome) return;
        var action = outcome.actions.find(function(a) { return a.id === actionId; });
        if (!action || action.done) return;

        action.done = true;
        action.completedDate = new Date().toDateString();

        // Record actual time - check if timer is running or if we have accumulated time
        if (currentTimerTask.outcomeId === outcomeId && currentTimerTask.actionId === actionId) {
            // Timer is currently running for this task
            var actualMins = getActualMinutesFromTimer();
            if (actualMins) {
                action.actualMinutes = actualMins;
            }
            stopTaskTimer();
        } else if (action.accumulatedSeconds && action.accumulatedSeconds > 0) {
            // Timer was used previously but stopped - use accumulated time
            action.actualMinutes = Math.ceil(action.accumulatedSeconds / 60);
        }

        // Clear accumulated seconds after completion
        delete action.accumulatedSeconds;

        var catCount = (action.categories && action.categories.length > 0) ? action.categories.length : 1;
        var points = 10 + (catCount * 5); // Base 15 for 1 cat, 20 for 2, 25 for 3, etc.
        data.totalMomentum += points;

        var logEntry = {
            text: action.text,
            outcome: outcome.result,
            category: outcome.category,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            date: new Date().toDateString(),
            points: points
        };
        if (action.actualMinutes) {
            logEntry.actualMinutes = action.actualMinutes;
        }
        data.log.push(logEntry);

        // Check if outcome is now complete
        var allDone = outcome.actions.every(function(a) { return a.done; });
        if (allDone && outcome.actions.length > 0) {
            outcome.completed = true;
            data.totalMomentum += 100;
        }

        updateStreak();
        saveData();
        render();

        // Update last active date for engagement tracking
        if (firebaseReady && currentUser && isFoundingMember) {
            db.collection('users').doc(currentUser.uid).set({
                lastActiveDate: new Date().toISOString(),
                foundingMemberStatus: 'active'
            }, { merge: true });
        }

        // Show praise (mix in NCI authority nudges ~20% of the time)
        if (Math.random() < 0.2) {
            var nudge = NCI_AUTHORITY_NUDGES[Math.floor(Math.random() * NCI_AUTHORITY_NUDGES.length)];
            var banner = document.getElementById('praiseBanner');
            var text = document.getElementById('praiseText');
            text.textContent = nudge;
            banner.classList.remove('hidden');
            banner.classList.add('praise-animate');
            setTimeout(function() { banner.classList.add('praise-fade-out'); setTimeout(function() { banner.classList.add('hidden'); banner.classList.remove('praise-animate', 'praise-fade-out'); }, 800); }, 5000);
        } else {
            showPraise();
        }

        // Joy burst — sparkle emojis fly up from the card
        joyBurst();

        // Play celebration audio
        playCompletionAudio();

        // Process gamification (combo, level, badges, challenges)
        var wasOverdue = action.deadline && new Date(action.deadline) < new Date();
        try { processGamification(wasOverdue); } catch(e) { console.error('gamification error:', e); }

        // Milestone upgrade nudges (free signed-in users only)
        if (currentUser && !isOfflineMode && userTier !== 'pro' && data.log) {
            var logLen = data.log.length;
            var milestoneMsg = null;
            if (logLen === 25) milestoneMsg = '25 actions crushed! \u{1F4AA} Ready to go Pro?';
            else if (logLen === 50) milestoneMsg = '50 actions! \u{1F525} Unlock unlimited power with Pro';
            else if (logLen === 100) milestoneMsg = 'Century Club! \u{1F4AF} You\'ve earned Pro status';
            if (milestoneMsg) {
                setTimeout(function() { showMilestoneNudge(milestoneMsg); }, 6500);
            }
        }

        // Check review/feedback triggers
        try { checkReviewTrigger(); } catch(e) {}
        try { checkFeedbackTrigger(); } catch(e) {}

        // Track session task count for extended break
        data.sessionTaskCount++;

        if (data.sessionTaskCount >= data.extendedBreakThreshold) {
            // Reset counter and set new random threshold (4 or 5)
            data.sessionTaskCount = 0;
            data.extendedBreakThreshold = Math.floor(Math.random() * 2) + 4;
            saveData();
            // Gently suggest a break after 4-5 tasks (not forced)
            setTimeout(function() {
                showExtendedBreak();
            }, 1500);
        } else {
            saveData();
            // Movement breaks no longer auto-trigger after every action.
            // Users can access Reset tools via the overflow menu when they want.
            // This prevents interrupting flow state — critical for ADHD.
        }
    }

    // ==========================================
    //  POMODORO TIMER
    // ==========================================
    function startPomodoro() {
        var remaining = 15 * 60;
        var display = document.getElementById('pomodoroTime');
        var container = document.getElementById('pomodoroDisplay');
        if (container) container.classList.remove('hidden');
        var _bp1 = document.getElementById('btnStartPomodoro'); if (_bp1) _bp1.style.display = 'none';

        pomodoroInterval = setInterval(function() {
            remaining--;
            var m = Math.floor(remaining / 60);
            var s = remaining % 60;
            display.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
            if (remaining <= 0) {
                clearInterval(pomodoroInterval);
                pomodoroInterval = null;
                display.textContent = "Time's up!";
                if (container) container.classList.add('hidden');
                var _bp2 = document.getElementById('btnStartPomodoro'); if (_bp2) _bp2.style.display = '';
            }
        }, 1000);
    }

    function stopPomodoro() {
        if (pomodoroInterval) {
            clearInterval(pomodoroInterval);
            pomodoroInterval = null;
        }
        var _pd = document.getElementById('pomodoroDisplay'); if (_pd) _pd.classList.add('hidden');
        var _bp3 = document.getElementById('btnStartPomodoro'); if (_bp3) _bp3.style.display = '';
    }

    // ==========================================
    //  TASK TIMER (Tracks actual time spent)
    // ==========================================
    // Focus on a specific action: override next action, start timer, scroll up
    var forcedNextAction = null;

    function focusOnAction(outcomeId, actionId) {
        var outcome = data.outcomes.find(function(o) { return o.id === outcomeId; });
        if (!outcome) return;
        var action = outcome.actions.find(function(a) { return a.id === actionId; });
        if (!action || action.done) return;

        // Set focus filter to this outcome's category
        focusCategoryFilter = outcome.category;
        var focusFilter = document.getElementById('focusCategoryFilter');
        if (focusFilter) {
            focusFilter.querySelectorAll('.focus-cat-btn').forEach(function(b) {
                b.classList.toggle('active', b.dataset.focusCat === outcome.category);
            });
        }

        // Force this action as the next action
        var score = calculateLeverageScore(action, outcome);
        forcedNextAction = { text: action.text, outcome: outcome.result, outcomeId: outcome.id, actionId: action.id, estMinutes: action.estMinutes, category: outcome.category, leverageScore: score };

        // Re-render to show it in #1 Next Action
        renderNextAction();

        // Start the timer for this action
        currentTimerTask = { outcomeId: outcomeId, actionId: actionId };
        taskTimerSeconds = (action.accumulatedSeconds) ? action.accumulatedSeconds : 0;
        taskTimerActive = true;
        lastCheckInTime = Date.now();
        updateTaskTimerDisplay();
        document.getElementById('taskTimerDisplay').classList.remove('hidden');
        var _bst1 = document.getElementById('btnStartTaskTimer'); if (_bst1) _bst1.style.display = 'none';
        var _bstp1 = document.getElementById('btnStopTaskTimer'); if (_bstp1) _bstp1.style.display = '';

        taskTimerInterval = setInterval(function() {
            taskTimerSeconds++;
            updateTaskTimerDisplay();
            var now = Date.now();
            if (now - lastCheckInTime >= 10 * 60 * 1000) {
                showTaskCheckIn();
                lastCheckInTime = now;
            }
        }, 1000);

        // Scroll to the top to see the next action card
        document.getElementById('nextActionCard').scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Clear forced action after render so normal flow resumes after completion
        forcedNextAction = null;
    }

    function startTaskTimer() {
        // Get current next action
        var next = getNextAction();
        if (!next) return;

        currentTimerTask = { outcomeId: next.outcomeId, actionId: next.actionId };

        // Load accumulated time from the action (cumulative across sessions)
        var outcome = data.outcomes.find(function(o) { return o.id === next.outcomeId; });
        var action = outcome ? outcome.actions.find(function(a) { return a.id === next.actionId; }) : null;
        taskTimerSeconds = (action && action.accumulatedSeconds) ? action.accumulatedSeconds : 0;

        taskTimerActive = true;
        lastCheckInTime = Date.now();

        updateTaskTimerDisplay();
        document.getElementById('taskTimerDisplay').classList.remove('hidden');
        var _bst2 = document.getElementById('btnStartTaskTimer'); if (_bst2) _bst2.style.display = 'none';
        var _bstp2 = document.getElementById('btnStopTaskTimer'); if (_bstp2) _bstp2.style.display = '';

        // Start counting up
        taskTimerInterval = setInterval(function() {
            taskTimerSeconds++;
            updateTaskTimerDisplay();

            // Check for 10-minute check-in
            var now = Date.now();
            if (now - lastCheckInTime >= 10 * 60 * 1000) { // 10 minutes
                showTaskCheckIn();
                lastCheckInTime = now;
            }
        }, 1000);
    }

    function updateTaskTimerDisplay() {
        var hours = Math.floor(taskTimerSeconds / 3600);
        var mins = Math.floor((taskTimerSeconds % 3600) / 60);
        var secs = taskTimerSeconds % 60;
        var display = '';
        if (hours > 0) {
            display = hours + ':' + (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
        } else {
            display = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
        }
        document.getElementById('taskTimerTime').textContent = display;
    }

    function stopTaskTimer() {
        if (taskTimerInterval) {
            clearInterval(taskTimerInterval);
            taskTimerInterval = null;
        }

        // Save accumulated time to the action
        if (currentTimerTask.outcomeId && currentTimerTask.actionId && taskTimerSeconds > 0) {
            var outcome = data.outcomes.find(function(o) { return o.id === currentTimerTask.outcomeId; });
            if (outcome) {
                var action = outcome.actions.find(function(a) { return a.id === currentTimerTask.actionId; });
                if (action) {
                    action.accumulatedSeconds = taskTimerSeconds;
                    saveData();
                }
            }
        }

        taskTimerActive = false;
        document.getElementById('taskTimerDisplay').classList.add('hidden');
        var _bst3 = document.getElementById('btnStartTaskTimer'); if (_bst3) _bst3.style.display = '';
        var _bstp = document.getElementById('btnStopTaskTimer'); if (_bstp) _bstp.style.display = 'none';
        currentTimerTask = { outcomeId: null, actionId: null };
    }

    function pauseTaskTimer() {
        if (taskTimerInterval) {
            clearInterval(taskTimerInterval);
            taskTimerInterval = null;
        }
        taskTimerActive = false;
        document.getElementById('btnPauseTaskTimer').style.display = 'none';
        document.getElementById('btnResumeTaskTimer').style.display = '';
    }

    function resumeTaskTimer() {
        taskTimerActive = true;
        lastCheckInTime = Date.now();
        document.getElementById('btnPauseTaskTimer').style.display = '';
        document.getElementById('btnResumeTaskTimer').style.display = 'none';

        taskTimerInterval = setInterval(function() {
            taskTimerSeconds++;
            updateTaskTimerDisplay();

            var now = Date.now();
            if (now - lastCheckInTime >= 10 * 60 * 1000) {
                showTaskCheckIn();
                lastCheckInTime = now;
            }
        }, 1000);
    }

    function showTaskCheckIn() {
        // Pause timer during check-in
        if (taskTimerInterval) {
            clearInterval(taskTimerInterval);
            taskTimerInterval = null;
        }

        var next = getNextAction();
        var taskName = next ? next.text : 'current task';
        document.getElementById('checkInTaskName').textContent = taskName;

        var mins = Math.floor(taskTimerSeconds / 60);
        document.getElementById('checkInElapsedTime').textContent = mins + ' minute' + (mins !== 1 ? 's' : '');

        document.getElementById('taskCheckInOverlay').classList.remove('hidden');
    }

    function handleCheckInYes() {
        document.getElementById('taskCheckInOverlay').classList.add('hidden');
        lastCheckInTime = Date.now();
        // Resume timer
        taskTimerInterval = setInterval(function() {
            taskTimerSeconds++;
            updateTaskTimerDisplay();

            var now = Date.now();
            if (now - lastCheckInTime >= 10 * 60 * 1000) {
                showTaskCheckIn();
                lastCheckInTime = now;
            }
        }, 1000);
    }

    function handleCheckInNo() {
        document.getElementById('taskCheckInOverlay').classList.add('hidden');
        // Stop timer completely
        stopTaskTimer();
    }

    function getActualMinutesFromTimer() {
        if (taskTimerSeconds > 0) {
            return Math.ceil(taskTimerSeconds / 60);
        }
        return null;
    }

    // ==========================================
    //  PRIMING TIMERS
    // ==========================================
    function startPrimingTimer(btn) {
        var seconds = parseInt(btn.dataset.seconds);
        var display = btn.nextElementSibling;
        display.classList.remove('hidden');
        btn.style.display = 'none';
        var remaining = seconds;
        var interval = setInterval(function() {
            remaining--;
            display.textContent = '00:' + (remaining < 10 ? '0' : '') + remaining;
            if (remaining <= 0) {
                clearInterval(interval);
                display.textContent = 'Done!';
                display.style.color = '#6aad99';
            }
        }, 1000);
    }

    // ==========================================
    //  WEEKLY REVIEW
    // ==========================================
    function showWeeklyReview() {
        var now = new Date();
        var weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        var activeCatIds = getActiveCategories().map(function(c) { return c.id; });

        var weeklyActions = [];
        var incompleteActions = [];

        data.outcomes.forEach(function(o) {
            if (!isOutcomeInCurrentMode(o)) return;
            o.actions.forEach(function(a) {
                if (a.done && a.completedDate) {
                    var d = new Date(a.completedDate);
                    if (!isNaN(d.getTime()) && d >= weekAgo) weeklyActions.push(a.text);
                }
                if (!a.done) incompleteActions.push(a.text);
            });
        });

        // Also check log entries as backup (covers edge cases with date parsing)
        data.log.forEach(function(l) {
            if (!l.date || !l.category) return;
            if (activeCatIds.indexOf(l.category) === -1) return;
            var ld = new Date(l.date);
            if (!isNaN(ld.getTime()) && ld >= weekAgo && weeklyActions.indexOf(l.text) === -1) {
                weeklyActions.push(l.text);
            }
        });

        var totalThisWeek = weeklyActions.length + incompleteActions.length;
        var pct = totalThisWeek > 0 ? Math.round((weeklyActions.length / totalThisWeek) * 100) : 0;

        // Progress ring
        var ring = document.getElementById('weeklyProgressRing');
        var circumference = 326.73;
        var offset = circumference - (pct / 100) * circumference;
        ring.style.strokeDashoffset = offset;
        document.getElementById('weeklyProgressText').textContent = pct + '%';

        // Wins
        var winsEl = document.getElementById('weeklyWins');
        winsEl.innerHTML = weeklyActions.length > 0 ?
            weeklyActions.slice(0, 10).map(function(w) { return '<li>' + escapeHtml(w) + '</li>'; }).join('') :
            '<li>No completed actions this week yet</li>';

        // Carry over
        var carryEl = document.getElementById('weeklyCarryOver');
        carryEl.innerHTML = incompleteActions.length > 0 ?
            incompleteActions.slice(0, 10).map(function(c) { return '<li>' + escapeHtml(c) + '</li>'; }).join('') :
            '<li>All caught up!</li>';

        // Weekly momentum (filtered by mode)
        var weekPoints = 0;
        data.log.forEach(function(l) {
            if (l.date && l.category && activeCatIds.indexOf(l.category) !== -1) {
                var d = new Date(l.date);
                if (d >= weekAgo) weekPoints += l.points;
            }
        });
        document.getElementById('momentumScore').textContent = weekPoints;

        document.getElementById('weeklyReviewOverlay').classList.remove('hidden');
    }

    // ==========================================
    //  ARCHIVE SYSTEM
    // ==========================================
    function toggleBackBurner(outcomeId) {
        var outcome = data.outcomes.find(function(o) { return o.id === outcomeId; });
        if (!outcome) return;
        outcome.backBurner = !outcome.backBurner;
        saveData();
        render();
    }

    function archiveOutcome(outcomeId) {
        var idx = data.outcomes.findIndex(function(o) { return o.id === outcomeId; });
        if (idx === -1) return;
        var outcome = data.outcomes[idx];
        outcome.archivedDate = new Date().toISOString();
        data.archived.push(outcome);
        data.outcomes.splice(idx, 1);
        saveData();
        render();
    }

    function unarchiveOutcome(outcomeId) {
        var idx = data.archived.findIndex(function(o) { return o.id === outcomeId; });
        if (idx === -1) return;
        var outcome = data.archived[idx];
        delete outcome.archivedDate;
        data.outcomes.push(outcome);
        data.archived.splice(idx, 1);
        saveData();
        render();
        renderArchive(currentArchivePeriod);
    }

    var currentArchivePeriod = 'week';

    function renderArchive(period) {
        currentArchivePeriod = period;
        var now = new Date();
        var cutoff;
        if (period === 'week') {
            cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        } else if (period === 'month') {
            cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        } else if (period === 'year') {
            cutoff = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        } else {
            cutoff = new Date(0); // all time
        }

        var filtered = data.archived.filter(function(o) {
            if (!isOutcomeInCurrentMode(o)) return false;
            var d = new Date(o.archivedDate || o.createdDate || 0);
            return d >= cutoff;
        });

        // Sort by archived date, newest first
        filtered.sort(function(a, b) {
            return new Date(b.archivedDate || 0) - new Date(a.archivedDate || 0);
        });

        // Stats
        var totalOutcomes = filtered.length;
        var totalActions = 0;
        var totalPoints = 0;
        filtered.forEach(function(o) {
            o.actions.forEach(function(a) {
                if (a.done) {
                    totalActions++;
                    var cc = (a.categories && a.categories.length > 0) ? a.categories.length : 1;
                    totalPoints += 10 + (cc * 5);
                }
            });
            totalPoints += 100; // outcome completion bonus
        });

        document.getElementById('archiveStats').innerHTML =
            '<div class="archive-stat">' +
                '<div class="archive-stat-value">' + totalOutcomes + '</div>' +
                '<div class="archive-stat-label">Outcomes</div>' +
            '</div>' +
            '<div class="archive-stat">' +
                '<div class="archive-stat-value">' + totalActions + '</div>' +
                '<div class="archive-stat-label">Actions Done</div>' +
            '</div>' +
            '<div class="archive-stat">' +
                '<div class="archive-stat-value">' + totalPoints + '</div>' +
                '<div class="archive-stat-label">Points Earned</div>' +
            '</div>';

        // List
        var listEl = document.getElementById('archiveList');
        if (filtered.length === 0) {
            listEl.innerHTML = '<p class="empty-state">No archived outcomes in this time period.</p>';
            return;
        }

        listEl.innerHTML = filtered.map(function(o) {
            var archivedDate = o.archivedDate ? new Date(o.archivedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
            var actionsHtml = o.actions.map(function(a) {
                return '<li>' + escapeHtml(a.text) + '</li>';
            }).join('');

            var catColor = '#c4996a';
            var cat = CATEGORIES.concat(BUSINESS_CATEGORIES).concat(HEALTH_CATEGORIES).concat(FINANCES_CATEGORIES).find(function(c) { return c.id === o.category; });
            if (cat) catColor = cat.color;

            return '<div class="archive-outcome" style="border-left-color:' + catColor + '">' +
                '<div class="archive-outcome-header">' +
                    '<div class="archive-outcome-result">' + escapeHtml(o.result) + '</div>' +
                    '<div class="archive-outcome-date">' + archivedDate + '</div>' +
                '</div>' +
                '<div class="archive-outcome-purpose">' + escapeHtml(o.purpose) + '</div>' +
                '<span class="archive-outcome-category" style="background:' + catColor + '22;color:' + catColor + '">' + o.category + '</span>' +
                '<ul class="archive-actions-list">' + actionsHtml + '</ul>' +
                '<button class="archive-unarchive-btn" data-outcome-id="' + o.id + '">Unarchive</button>' +
            '</div>';
        }).join('');
    }

    // ==========================================
    //  UTILITY
    // ==========================================
    function escapeHtml(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    // ==========================================
    //  EVENING RITUALS (8PM Seed Planting, 8:30PM Wind Down)
    // ==========================================

    function populateEveningSeed() {
        var tomorrowCats = getTomorrowFocusCategories();
        var tomorrowLabel = getTomorrowFocusLabel(true);
        var dayName = getTomorrowDayName();
        var allCats = CATEGORIES.concat(BUSINESS_CATEGORIES).concat(HEALTH_CATEGORIES).concat(FINANCES_CATEGORIES);

        // Set title and hint
        document.getElementById('seedTomorrowTitle').innerHTML = '&#127775; Tomorrow\'s Focus: ' + tomorrowLabel + ' (' + dayName + ')';
        document.getElementById('seedTomorrowHint').innerHTML = 'Here\'s what\'s lined up for ' + tomorrowLabel + ' tomorrow:';

        // Find outcomes and pending actions for tomorrow's category
        var preview = document.getElementById('seedTomorrowPreview');
        var html = '';
        var found = false;

        if (data && data.outcomes) {
            data.outcomes.forEach(function(o) {
                if (o.completed) return;
                if (!isOutcomeInCurrentMode(o)) return;
                var matchesCat = tomorrowCats.indexOf(o.category) !== -1;
                // Also check if any action has tomorrow's category
                var hasMatchingAction = false;
                o.actions.forEach(function(a) {
                    if (a.categories && a.categories.length > 0) {
                        a.categories.forEach(function(ac) {
                            if (tomorrowCats.indexOf(ac) !== -1) hasMatchingAction = true;
                        });
                    }
                });

                if (!matchesCat && !hasMatchingAction) return;

                var pendingActions = o.actions.filter(function(a) { return !a.done; });
                if (pendingActions.length === 0) return;

                found = true;
                var catObj = allCats.find(function(c) { return c.id === o.category; });
                var catColor = catObj ? catObj.color : '#7c6fba';

                html += '<div class="seed-outcome">';
                html += '<div class="seed-outcome-title" style="border-left: 3px solid ' + catColor + '">' + escapeHtml(o.result) + '</div>';
                html += '<ul class="seed-action-list">';
                pendingActions.forEach(function(a) {
                    var est = a.estMinutes ? ' <span class="seed-est">' + a.estMinutes + ' min</span>' : '';
                    html += '<li>' + escapeHtml(a.text) + est + '</li>';
                });
                html += '</ul></div>';
            });
        }

        if (!found) {
            html = '<div class="seed-empty">No pending actions for ' + tomorrowLabel + ' yet. Create an outcome in that category to plant your seed!</div>';
        }

        preview.innerHTML = html;
    }

    function showCategoryGuide() {
        var cats = currentMode === 'business' ? BUSINESS_CATEGORIES : currentMode === 'health' ? HEALTH_CATEGORIES : currentMode === 'finances' ? FINANCES_CATEGORIES : CATEGORIES;
        var title = currentMode === 'business' ? '&#128188; Business Category Guide' : currentMode === 'health' ? '&#127973; Health Category Guide' : currentMode === 'finances' ? '&#128176; Finances Category Guide' : '&#127793; Life Category Guide';
        var subtitle = currentMode === 'business'
            ? 'Each category covers these areas of your business:'
            : currentMode === 'health' ? 'Each category covers these areas of your health:' : currentMode === 'finances' ? 'Each category covers these areas of your finances:' : 'Each category covers these areas of your life:';
        var el = document.getElementById('catGuideTitle');
        if (el) el.innerHTML = title;
        var sub = document.getElementById('catGuideSubtitle');
        if (sub) sub.textContent = subtitle;
        var content = document.getElementById('catGuideContent');
        if (!content) return;
        var html = '';
        cats.forEach(function(c) {
            var desc = CATEGORY_DESCRIPTIONS[c.id] || '';
            var displayName = c.name.replace('\n', ' & ');
            html += '<div class="cat-guide-item" style="border-left: 4px solid ' + c.color + '">';
            html += '<div class="cat-guide-name" style="color: ' + c.color + '">' + displayName + '</div>';
            html += '<div class="cat-guide-desc">' + desc + '</div>';
            html += '</div>';
        });
        // Add Saturday free day info
        html += '<div class="cat-guide-free-day">';
        html += '<div class="cat-guide-name" style="color: var(--accent-yellow)">&#127775; Saturday &mdash; Weakest Area</div>';
        html += '<div class="cat-guide-desc">Every Saturday, the app automatically focuses on your <strong>weakest wheel area</strong> &mdash; the category with the lowest score over the past 7 days. This ensures nothing falls behind!</div>';
        html += '</div>';
        content.innerHTML = html;
        document.getElementById('catGuideOverlay').classList.remove('hidden');
    }

    function showEveningSeed() {
        var key = 'lwp_evening_seed_' + new Date().toDateString();
        if (localStorage.getItem(key)) return; // Already shown today
        populateEveningSeed();
        document.getElementById('eveningSeedOverlay').classList.remove('hidden');
    }

    function showEveningSeedManual() {
        populateEveningSeed();
        document.getElementById('eveningSeedOverlay').classList.remove('hidden');
    }

    function showWindDown() {
        var key = 'lwp_wind_down_' + new Date().toDateString();
        if (localStorage.getItem(key)) return; // Already shown today
        document.getElementById('windDownOverlay').classList.remove('hidden');
    }

    function startWindDownTimer(btn) {
        var secs = parseInt(btn.dataset.seconds);
        var display = btn.nextElementSibling;
        btn.style.display = 'none';
        display.classList.remove('hidden');
        var remaining = secs;
        function tick() {
            var m = Math.floor(remaining / 60);
            var s = remaining % 60;
            display.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
            if (remaining <= 0) {
                display.textContent = 'Done!';
                display.style.color = 'var(--accent-green)';
                return;
            }
            remaining--;
            setTimeout(tick, 1000);
        }
        tick();
    }

    // Check every 60 seconds if it's time for evening rituals
    var _eveningCheckInterval = null;
    function startEveningScheduler() {
        if (_eveningCheckInterval) return;
        _eveningCheckInterval = setInterval(function() {
            var now = new Date();
            var h = now.getHours();
            var m = now.getMinutes();

            // 8:00 PM - Evening Seed Planting (Pro only)
            if (h === 20 && m >= 0 && m < 5 && isProUser()) {
                showEveningSeed();
            }
            // 8:30 PM - Wind Down Ritual (Pro only)
            if (h === 20 && m >= 30 && m < 35 && isProUser()) {
                showWindDown();
            }
        }, 60000); // Check every minute

        // Also check immediately on load
        var now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        if (h === 20 && m >= 0 && m < 30) {
            showEveningSeed();
        }
        if (h === 20 && m >= 30 || h === 21 && m < 5) {
            showWindDown();
        }
        // If past 8PM but before midnight, show seed if not done
        if (h >= 20) {
            showEveningSeed();
        }
        if (h >= 20 && m >= 30 || h >= 21) {
            showWindDown();
        }
    }

    // ==========================================
    //  EVENT LISTENERS
    // ==========================================
    function init() {
        // Only load from localStorage if data is not already loaded (e.g., by onAuthReady)
        if (!data) loadData();
        // Restore saved mode before first render
        var savedMode = localStorage.getItem('lwp_current_mode');
        if (savedMode && savedMode !== currentMode) {
            switchMode(savedMode);
        }

        // Add default starter outcomes for brand new users (no outcomes yet)
        try {
            if (data && data.outcomes && data.outcomes.length === 0 && (!data.log || data.log.length === 0)) {
                var today = new Date().toDateString();
                // Personal mode starter
                // Personal mode starter only (other modes are hidden/disabled)
                data.outcomes.push({
                    id: uid(),
                    result: 'Clean Room - Clean Mind',
                    purpose: 'A clean space helps me focus, reduces stress, and sets the tone for a productive day',
                    actions: [
                        { id: uid(), text: 'Clean Desk', done: false, estMinutes: 15, categories: ['fun_environment'] },
                        { id: uid(), text: 'Dust Desk & Computer', done: false, estMinutes: 10, categories: ['fun_environment'] },
                        { id: uid(), text: 'Watch How To Use My Habit Magic', done: false, estMinutes: 10, categories: ['personal_growth'] }
                    ],
                    category: 'fun_environment',
                    deadline: null, commitment: 8, completed: false, createdDate: today
                });
                saveData();
            }
        } catch(e) { console.error('default outcome error:', e); }

        // Auto-show help popup on first login (no log = brand new user)
        try {
            if (data && (!data.log || data.log.length === 0) && !localStorage.getItem('lwp_help_shown')) {
                localStorage.setItem('lwp_help_shown', '1');
                setTimeout(function() {
                    var helpOverlay = document.getElementById('helpOverlay');
                    if (helpOverlay) helpOverlay.classList.remove('hidden');
                }, 500);
            }
        } catch(e) { console.error('first login help error:', e); }

        // Weekly referral popup — show once per week for weeks 1, 2, 3
        try {
            if (data && data.log && data.log.length > 0) {
                var firstLogDate = new Date(data.log[0].date || data.log[0].createdDate);
                var daysSinceStart = Math.floor((Date.now() - firstLogDate.getTime()) / 86400000);
                var currentWeek = Math.floor(daysSinceStart / 7) + 1;
                if (currentWeek >= 4 && currentWeek <= 6) {
                    var referralKey = 'lwp_referral_shown_week_' + currentWeek;
                    if (!localStorage.getItem(referralKey)) {
                        localStorage.setItem(referralKey, '1');
                        setTimeout(function() {
                            // Refresh founding spots count before showing
                            loadFoundingMemberCount(function() {
                                var remaining = Math.max(0, FOUNDING_MEMBER_LIMIT - foundingMemberCount);
                                document.querySelectorAll('.founding-spots-count').forEach(function(el) { el.textContent = remaining; });
                            });
                            // Update referral link with user's actual referral code
                            var refInput = document.getElementById('referralLinkInput');
                            if (refInput) refInput.value = getReferralLink();
                            var overlay = document.getElementById('referralOverlay');
                            if (overlay) overlay.classList.remove('hidden');
                        }, 240000);
                    }
                }
            }
        } catch(e) { console.error('referral popup error:', e); }

        try { renderCategoryFilters(); } catch(e) { console.error('category filter error:', e); }
        try { restoreCombo(); } catch(e) { console.error('combo restore error:', e); }
        try { render(); } catch(e) { console.error('render error:', e); }
        try { renderMotivationQuote(); } catch(e) { console.error('quote error:', e); }
        try { initOutcomeDragDrop(); } catch(e) { console.error('outcome dnd error:', e); }

        // Compassionate Re-Entry — check if user has been away
        try { checkCompassionateReEntry(); } catch(e) { console.error('reentry check error:', e); }

        // Render streak freeze count in streak bar
        try { renderStreakFreezeIndicator(); } catch(e) { console.error('streak freeze render error:', e); }

        // Auto-Break Big Tasks Nudge
        try { initBigTaskNudge(); } catch(e) { console.error('big task nudge init error:', e); }

        // Collapse/Expand Outcomes Section
        safeBind('btnCollapseOutcomes', 'click', function() {
            var section = document.getElementById('outcomesSection');
            if (!section) return;
            var isCollapsed = section.classList.toggle('collapsed');
            this.textContent = isCollapsed ? '\u25B6' : '\u25BC';
            this.title = isCollapsed ? 'Show outcomes' : 'Hide outcomes';
            localStorage.setItem('lwp_outcomes_collapsed', isCollapsed ? '1' : '0');
        });
        // Restore collapsed state on load
        if (localStorage.getItem('lwp_outcomes_collapsed') === '1') {
            var outSec = document.getElementById('outcomesSection');
            var outBtn = document.getElementById('btnCollapseOutcomes');
            if (outSec) outSec.classList.add('collapsed');
            if (outBtn) { outBtn.textContent = '\u25B6'; outBtn.title = 'Show outcomes'; }
        }

        // Generic collapsible sections (Momentum, Badges, Action Log)
        // Default to collapsed for new users (progressive disclosure)
        var hasActivity = data && data.log && data.log.length > 0;
        document.querySelectorAll('.btn-collapse-section[data-collapse]').forEach(function(btn) {
            var sectionId = btn.dataset.collapse;
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                var section = document.getElementById(sectionId);
                if (!section) return;
                var isCollapsed = section.classList.toggle('collapsed');
                this.textContent = isCollapsed ? '\u25B6' : '\u25BC';
                this.title = isCollapsed ? 'Show' : 'Hide';
                localStorage.setItem('lwp_' + sectionId + '_collapsed', isCollapsed ? '1' : '0');
            });
            var savedState = localStorage.getItem('lwp_' + sectionId + '_collapsed');
            // If no saved preference, default to collapsed for new users
            if (savedState === '1' || (savedState === null && !hasActivity)) {
                var section = document.getElementById(sectionId);
                if (section) section.classList.add('collapsed');
                btn.textContent = '\u25B6';
                btn.title = 'Show';
            }
        });

        // More Actions overflow menu toggle
        safeBind('btnMoreActions', 'click', function(e) {
            e.stopPropagation();
            var menu = document.getElementById('moreActionsMenu');
            if (menu) menu.classList.toggle('hidden');
        });
        // Close more actions menu when clicking outside
        document.addEventListener('click', function(e) {
            var menu = document.getElementById('moreActionsMenu');
            if (menu && !menu.classList.contains('hidden')) {
                var wrap = e.target.closest('.more-actions-wrap');
                if (!wrap) menu.classList.add('hidden');
            }
        });

        // Maximize button — toggle focus mode directly
        safeBind('btnMaxFocus', 'click', function() {
            var isFocused = document.body.classList.toggle('focus-mode');
            this.textContent = isFocused ? 'Exit' : 'Maximize';
            this.title = isFocused ? 'Exit Focus Mode' : 'Maximize — focus on this one thing';
        });

        // PANIC button — show all reset/stuck strategies
        safeBind('btnPanic', 'click', function() {
            document.getElementById('stuckOverlay').classList.remove('hidden');
            var header = document.getElementById('stuckHeader');
            if (header) header.style.display = '';
            var container = document.getElementById('stuckOptionsContainer');
            if (container) container.style.display = '';
            var activity = document.getElementById('stuckActivity');
            if (activity) activity.classList.add('hidden');
            renderStuckOptions();
        });

        // Victory Goal dropdown — populate and persist
        (function initVictoryGoalDropdown() {
            var select = document.getElementById('victoryGoalSelect');
            if (!select) return;
            var saved = 9;
            try { saved = parseInt(localStorage.getItem('lwp_victory_goal')) || 9; } catch(e) {}
            if (saved < 3 || saved > 21) saved = 9;
            for (var i = 3; i <= 21; i++) {
                var opt = document.createElement('option');
                opt.value = i;
                opt.textContent = i;
                if (i === saved) opt.selected = true;
                select.appendChild(opt);
            }
            select.addEventListener('change', function() {
                var val = parseInt(this.value) || 9;
                try { localStorage.setItem('lwp_victory_goal', val); } catch(e) {}
                renderBalanceScore();
            });
        })();

        // Create New button — auto-expand outcomes when collapsed
        safeBind('btnNewOutcome', 'click', function() {
            var section = document.getElementById('outcomesSection');
            if (section && section.classList.contains('collapsed')) {
                section.classList.remove('collapsed');
                var colBtn = document.getElementById('btnCollapseOutcomes');
                if (colBtn) { colBtn.textContent = '\u25BC'; colBtn.title = 'Hide outcomes'; }
                localStorage.setItem('lwp_outcomes_collapsed', '0');
            }
        });

        // Export/Download Action Log
        safeBind('btnExportLog', 'click', function() {
            try { exportActionLog(); } catch(e) { console.error('export error:', e); }
        });

        // Feedback System — rating slider shows/hides testimonial section
        var feedbackRating = document.getElementById('feedbackRating');
        var feedbackRatingValue = document.getElementById('feedbackRatingValue');
        if (feedbackRating && feedbackRatingValue) {
            feedbackRating.addEventListener('input', function() {
                feedbackRatingValue.textContent = this.value;
                var testimonialSection = document.getElementById('feedbackTestimonialSection');
                if (testimonialSection) {
                    if (parseInt(this.value) >= 8) {
                        testimonialSection.classList.remove('hidden');
                    } else {
                        testimonialSection.classList.add('hidden');
                    }
                }
            });
        }
        safeBind('btnSubmitFeedback', 'click', function() {
            try { submitFeedback(); } catch(e) { console.error('feedback submit error:', e); }
        });

        // Daily feedback submit + emoji rating buttons
        safeBind('btnSubmitDailyFeedback', 'click', function() {
            try { submitDailyFeedback(); } catch(e) { console.error('daily feedback error:', e); }
        });

        // Landing page billing toggle moved to DOMContentLoaded (pre-login)

        // Billing toggle for pricing modal
        safeBind('billingToggle', 'change', function() {
            var isAnnual = this.checked;
            var starterPrice = document.getElementById('starterPrice');
            var starterPeriod = document.getElementById('starterPeriod');
            var starterSavings = document.getElementById('starterSavings');
            var proPrice = document.getElementById('proPrice');
            var proPeriod = document.getElementById('proPeriod');
            var proSavings = document.getElementById('proSavings');

            if (isAnnual) {
                if (starterPrice) starterPrice.textContent = '$8.25';
                if (starterPeriod) starterPeriod.textContent = '/mo ($99/yr)';
                if (starterSavings) starterSavings.classList.remove('hidden');
                if (proPrice) proPrice.textContent = '$14.92';
                if (proPeriod) proPeriod.textContent = '/mo ($179/yr)';
                if (proSavings) proSavings.classList.remove('hidden');
            } else {
                if (starterPrice) starterPrice.textContent = '$9.99';
                if (starterPeriod) starterPeriod.textContent = '/month';
                if (starterSavings) starterSavings.classList.add('hidden');
                if (proPrice) proPrice.textContent = '$19.99';
                if (proPeriod) proPeriod.textContent = '/month';
                if (proSavings) proSavings.classList.add('hidden');
            }

            document.getElementById('billingMonthlyLabel').classList.toggle('active', !isAnnual);
            document.getElementById('billingAnnualLabel').classList.toggle('active', isAnnual);
            updateCheckoutLinks();
        });

        document.querySelectorAll('.emoji-rating-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.emoji-rating-btn').forEach(function(b) { b.classList.remove('selected'); });
                btn.classList.add('selected');
            });
        });
        // Chip checkbox toggle visual
        document.querySelectorAll('.df-chip').forEach(function(chip) {
            chip.addEventListener('click', function() {
                var input = chip.querySelector('input');
                if (input && input.type === 'radio') {
                    // For radios, clear siblings then mark selected
                    var name = input.name;
                    document.querySelectorAll('input[name="' + name + '"]').forEach(function(rb) {
                        var parentChip = rb.closest('.df-chip');
                        if (parentChip) parentChip.classList.remove('checked');
                    });
                    chip.classList.toggle('checked', input.checked);
                } else {
                    chip.classList.toggle('checked', input.checked);
                }
            });
        });

        // Power Priming — no longer auto-pops. Users access it via State Check in the menu.
        // This reduces interruptions for ADHD users who need unbroken flow.

        // Focus category filter — now also filters outcomes (single unified filter)
        document.querySelectorAll('.focus-cat-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.focus-cat-btn').forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                focusCategoryFilter = this.dataset.focusCat;
                currentFilter = this.dataset.focusCat;
                renderNextAction();
                renderOutcomes();
            });
        });

        // Motivation quote refresh
        safeBind('btnRefreshQuote', 'click', function() {
            try { renderMotivationQuote(); } catch(e) { console.error('quote refresh error:', e); }
        });

        // Find on page — trigger native browser find
        safeBind('btnPageFind', 'click', function() {
            try {
                // Use execCommand for broadest compatibility (including PWA/mobile)
                window.find ? window.find('') : document.execCommand('find');
            } catch(e) {
                // Fallback: simulate Ctrl+F / Cmd+F
                var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
                var evt = new KeyboardEvent('keydown', {
                    key: 'f', code: 'KeyF', keyCode: 70,
                    ctrlKey: !isMac, metaKey: isMac, bubbles: true
                });
                document.dispatchEvent(evt);
            }
        });

        // Category Guide — use event delegation since button is recreated on mode switch
        document.addEventListener('click', function(e) {
            if (e.target && (e.target.id === 'btnCatGuide' || e.target.closest('#btnCatGuide'))) {
                try { showCategoryGuide(); } catch(e2) { console.error('cat guide error:', e2); }
            }
        });

        // New Outcome (pill button in header)
        safeBind('btnNewOutcome', 'click', function() {
            renderNewOutcomeCategoryPills();
            populateActionCatDropdowns();
            document.getElementById('newOutcomeOverlay').classList.remove('hidden');
        });
        // Hide/Unhide the Rest toggle
        safeBind('btnToggleRest', 'click', function() {
            var sections = ['momentumSection', 'badgesSection', 'actionLogSection'];
            var btn = document.getElementById('btnToggleRest');
            var isHidden = localStorage.getItem('rest_hidden') === '1';
            if (isHidden) {
                // Unhide
                sections.forEach(function(id) {
                    var el = document.getElementById(id);
                    if (el) el.style.display = '';
                });
                localStorage.setItem('rest_hidden', '0');
                btn.innerHTML = '&#128065; Hide the Rest';
            } else {
                // Hide
                sections.forEach(function(id) {
                    var el = document.getElementById(id);
                    if (el) el.style.display = 'none';
                });
                localStorage.setItem('rest_hidden', '1');
                btn.innerHTML = '&#128065; Unhide the Rest';
            }
        });
        // Apply saved state on load
        (function() {
            if (localStorage.getItem('rest_hidden') === '1') {
                ['momentumSection', 'badgesSection', 'actionLogSection'].forEach(function(id) {
                    var el = document.getElementById(id);
                    if (el) el.style.display = 'none';
                });
                var btn = document.getElementById('btnToggleRest');
                if (btn) btn.innerHTML = '&#128065; Unhide the Rest';
            }
        })();
        // Create New Outcome from Next Action card (when no tasks left)
        var btnCreateNext = document.getElementById('btnCreateOutcomeNext');
        if (btnCreateNext) btnCreateNext.addEventListener('click', function() {
            renderNewOutcomeCategoryPills();
            populateActionCatDropdowns();
            document.getElementById('newOutcomeOverlay').classList.remove('hidden');
        });
        safeBind('closeNewOutcome', 'click', function() {
            document.getElementById('newOutcomeOverlay').classList.add('hidden');
        });

        // More options toggle (progressive disclosure)
        safeBind('btnMoreOptions', 'click', function() {
            var section = document.getElementById('moreOptionsSection');
            if (section) {
                var isHidden = section.classList.toggle('hidden');
                this.innerHTML = isHidden ? 'More options &#9660;' : 'Less options &#9650;';
            }
        });
        safeBind('btnEditMoreOptions', 'click', function() {
            var section = document.getElementById('editMoreOptionsSection');
            if (section) {
                var isHidden = section.classList.toggle('hidden');
                this.innerHTML = isHidden ? 'More options &#9660;' : 'Less options &#9650;';
            }
        });

        // Add more actions
        safeBind('addMoreActions', 'click', function() {
            var row = document.createElement('div');
            row.className = 'action-input-row';
            row.innerHTML = '<input type="text" class="input-field" placeholder="Next step...">' +
                '<select class="est-select est-input" title="Estimated minutes">' +
                    '<option value="5">5m</option>' +
                    '<option value="10">10m</option>' +
                    '<option value="15" selected>15m</option>' +
                    '<option value="20">20m</option>' +
                '</select>';
            document.getElementById('actionsList').appendChild(row);
        });

        // Category pills
        document.querySelectorAll('.category-pills:not(.edit-category-pills) .pill').forEach(function(pill) {
            pill.addEventListener('click', function() {
                this.parentElement.querySelectorAll('.pill').forEach(function(p) { p.classList.remove('active'); });
                this.classList.add('active');
            });
        });
        document.querySelectorAll('.edit-category-pills .pill').forEach(function(pill) {
            pill.addEventListener('click', function() {
                this.parentElement.querySelectorAll('.pill').forEach(function(p) { p.classList.remove('active'); });
                this.classList.add('active');
            });
        });

        // Save Outcome
        safeBind('saveOutcome', 'click', function() {
            var result = document.getElementById('outcomeResult').value.trim();
            var purposeEl = document.getElementById('outcomePurpose');
            var purpose = purposeEl ? purposeEl.value.trim() : '';
            if (!result) return;

            // Pro gate: max 3 outcomes for free users
            if (data && data.outcomes && data.outcomes.length >= 3 && !hasUnlimitedOutcomes()) {
                showPricingModal();
                return;
            }

            var actions = [];
            var missingTime = false;
            document.querySelectorAll('#actionsList .action-input-row').forEach(function(row) {
                var text = row.querySelector('input[type="text"]').value.trim();
                if (text) {
                    var estValue = parseInt(row.querySelector('.est-input').value);
                    if (!estValue || estValue < 1) {
                        missingTime = true;
                        row.querySelector('.est-input').classList.add('input-error');
                    } else {
                        row.querySelector('.est-input').classList.remove('input-error');
                    }
                    var extraCatSel = row.querySelector('.action-extra-cat');
                    var extraCat = extraCatSel ? extraCatSel.value : '';
                    var deadlineInput = row.querySelector('.action-deadline-input');
                    var actionDeadlineVal = (deadlineInput && deadlineInput.value) ? deadlineInput.value : null;
                    if (!actionDeadlineVal) {
                        var d7 = new Date();
                        d7.setDate(d7.getDate() + 7);
                        actionDeadlineVal = d7.toISOString().split('T')[0];
                    }
                    actions.push({
                        id: uid(),
                        text: text,
                        categories: [],
                        extraCategory: extraCat,
                        estMinutes: estValue || 15,
                        deadline: actionDeadlineVal,
                        done: false,
                        completedDate: null
                    });
                }
            });
            if (actions.length === 0) return;
            if (missingTime) return;

            var activePill = document.querySelector('.category-pills:not(.edit-category-pills) .pill.active');
            var category = activePill ? activePill.dataset.category : 'health_energy';

            // Soft cap: max 3 active outcomes per category
            var activeInCat = data.outcomes.filter(function(o) {
                return o.category === category && !o.completed;
            }).length;
            if (activeInCat >= 3) {
                var catName = category.replace(/_/g, ' ');
                var proceed = confirm('You already have 3 active outcomes in ' + catName + '. Focus beats volume — want to finish one first?\n\nPress OK to add anyway, or Cancel to go back.');
                if (!proceed) return;
            }

            // Assign outcome category to each action
            actions.forEach(function(action) {
                var assignedCats = [category];
                if (action.extraCategory && action.extraCategory !== category) {
                    assignedCats.push(action.extraCategory);
                }
                action.categories = assignedCats;
                delete action.extraCategory;
            });

            var deadlineEl = document.getElementById('outcomeDeadline');
            var commitmentEl = document.getElementById('commitmentSlider');
            data.outcomes.push({
                id: uid(),
                result: result,
                purpose: purpose,
                actions: actions,
                category: category,
                deadline: (deadlineEl && deadlineEl.value) ? deadlineEl.value : null,
                commitment: commitmentEl ? parseInt(commitmentEl.value) : 7,
                completed: false,
                createdDate: new Date().toDateString()
            });

            saveData();
            render();
            document.getElementById('newOutcomeOverlay').classList.add('hidden');
            // Reset form
            document.getElementById('outcomeResult').value = '';
            var purposeReset = document.getElementById('outcomePurpose');
            if (purposeReset) purposeReset.value = '';
            var deadlineReset = document.getElementById('outcomeDeadline');
            if (deadlineReset) deadlineReset.value = '';
            var commitReset = document.getElementById('commitmentSlider');
            if (commitReset) commitReset.value = '7';
            var commitValReset = document.getElementById('commitmentValue');
            if (commitValReset) commitValReset.textContent = '7';
            // Collapse more options
            var moreSection = document.getElementById('moreOptionsSection');
            if (moreSection) moreSection.classList.add('hidden');
            var moreBtnReset = document.getElementById('btnMoreOptions');
            if (moreBtnReset) moreBtnReset.innerHTML = 'More options &#9660;';
            var timeOpts = '<select class="est-select est-input" title="Estimated minutes"><option value="5">5m</option><option value="10">10m</option><option value="15" selected>15m</option><option value="20">20m</option></select>';
            document.getElementById('actionsList').innerHTML =
                '<div class="action-input-row"><input type="text" class="input-field" placeholder="Step 1...">' + timeOpts + '</div>' +
                '<div class="action-input-row"><input type="text" class="input-field" placeholder="Step 2...">' + timeOpts + '</div>' +
                '<div class="action-input-row"><input type="text" class="input-field" placeholder="Step 3...">' + timeOpts + '</div>';
        });

        // Commitment slider
        safeBind('commitmentSlider', 'input', function() {
            document.getElementById('commitmentValue').textContent = this.value;
        });
        safeBind('editCommitmentSlider', 'input', function() {
            document.getElementById('editCommitmentValue').textContent = this.value;
        });

        // Complete next action
        safeBind('btnCompleteNext', 'click', function() {
            var oid = this.dataset.outcomeId;
            var aid = this.dataset.actionId;
            if (oid && aid) completeAction(oid, aid);
        });

        // Complete/uncomplete via checkbox
        safeBind('outcomesGrid', 'change', function(e) {
            if (e.target.classList.contains('action-checkbox')) {
                var oid = e.target.dataset.outcomeId;
                var aid = e.target.dataset.actionId;
                if (e.target.checked) {
                    completeAction(oid, aid);
                } else {
                    uncompleteAction(oid, aid);
                }
            }
        });

        // Click action text to edit
        safeBind('outcomesGrid', 'click', function(e) {
            // Toggle completed actions dropdown
            var toggle = e.target.closest('.completed-actions-toggle');
            if (toggle) {
                var group = toggle.nextElementSibling;
                if (group && group.classList.contains('completed-actions-group')) {
                    group.classList.toggle('hidden');
                    var arrow = toggle.querySelector('.toggle-arrow');
                    if (arrow) arrow.textContent = group.classList.contains('hidden') ? '\u25B6' : '\u25BC';
                }
                return;
            }
            var textEl = e.target.closest('.action-text');
            if (textEl) {
                openEditAction(textEl.dataset.outcomeId, textEl.dataset.actionId);
            }
            // Delete outcome
            var delBtn = e.target.closest('.btn-delete-outcome');
            if (delBtn) {
                if (confirm('Delete this outcome and all its actions?')) {
                    data.outcomes = data.outcomes.filter(function(o) { return o.id !== delBtn.dataset.outcomeId; });
                    saveData();
                    render();
                }
            }
            // Edit outcome
            var editBtn = e.target.closest('.btn-edit-outcome');
            if (editBtn) {
                openEditOutcome(editBtn.dataset.outcomeId);
            }
            // Add action to outcome
            var addBtn = e.target.closest('.btn-add-action-to');
            if (addBtn) {
                openAddAction(addBtn.dataset.outcomeId);
            }
            // Focus on action (timer icon)
            var focusBtn = e.target.closest('.btn-focus-action');
            if (focusBtn) {
                focusOnAction(focusBtn.dataset.outcomeId, focusBtn.dataset.actionId);
                return;
            }
            // Back burner toggle
            var bbBtn = e.target.closest('.btn-back-burner');
            if (bbBtn) {
                toggleBackBurner(bbBtn.dataset.outcomeId);
            }
        });

        // Edit Action Modal
        var editingAction = { outcomeId: null, actionId: null };

        function openEditAction(outcomeId, actionId) {
            try {
                var outcome = data.outcomes.find(function(o) { return o.id === outcomeId; });
                if (!outcome) return;
                var action = outcome.actions.find(function(a) { return a.id === actionId; });
                if (!action) return;
                editingAction = { outcomeId: outcomeId, actionId: actionId };
                document.getElementById('editActionText').value = action.text;
                renderActionCategoryCheckboxes('editActionCategories', action.categories || []);
                document.getElementById('editActionEst').value = action.estMinutes || 15;
                document.getElementById('editActionDeadline').value = action.deadline || '';
                // Populate outcome dropdown
                var outcomeSelect = document.getElementById('editActionOutcome');
                var options = '';
                for (var i = 0; i < data.outcomes.length; i++) {
                    var o = data.outcomes[i];
                    var sel = o.id === outcomeId ? ' selected' : '';
                    var label = o.result || 'Outcome ' + (i + 1);
                    options += '<option value="' + o.id + '"' + sel + '>' + escapeHtml(label) + '</option>';
                }
                outcomeSelect.innerHTML = options;
                document.getElementById('editActionOverlay').classList.remove('hidden');
            } catch(e) {
                console.error('openEditAction error:', e);
            }
        }

        safeBind('closeEditAction', 'click', function() {
            document.getElementById('editActionOverlay').classList.add('hidden');
        });

        safeBind('btnSaveEditAction', 'click', function() {
            var outcome = data.outcomes.find(function(o) { return o.id === editingAction.outcomeId; });
            if (!outcome) return;
            var action = outcome.actions.find(function(a) { return a.id === editingAction.actionId; });
            if (!action) return;
            action.text = document.getElementById('editActionText').value.trim();
            action.categories = getCheckedCategories('editActionCategories');
            action.estMinutes = parseInt(document.getElementById('editActionEst').value) || 15;
            action.deadline = document.getElementById('editActionDeadline').value || null;

            // Check if outcome changed (move action)
            var newOutcomeId = document.getElementById('editActionOutcome').value;
            if (newOutcomeId && newOutcomeId !== editingAction.outcomeId) {
                var newOutcome = data.outcomes.find(function(o) { return o.id === newOutcomeId; });
                if (newOutcome) {
                    // Remove from old outcome
                    outcome.actions = outcome.actions.filter(function(a) { return a.id !== editingAction.actionId; });
                    // Add to new outcome
                    newOutcome.actions.push(action);
                    // If new outcome was completed, reopen it
                    if (newOutcome.completed) newOutcome.completed = false;
                }
            }

            saveData();
            render();
            document.getElementById('editActionOverlay').classList.add('hidden');
        });

        safeBind('btnDeleteAction', 'click', function() {
            if (!confirm('Delete this action?')) return;
            var outcome = data.outcomes.find(function(o) { return o.id === editingAction.outcomeId; });
            if (!outcome) return;
            outcome.actions = outcome.actions.filter(function(a) { return a.id !== editingAction.actionId; });
            saveData();
            render();
            document.getElementById('editActionOverlay').classList.add('hidden');
        });

        // Edit Outcome Modal
        var editingOutcomeId = null;

        function renderEditCategoryPills(selectedCategory) {
            var cats = getActiveCategories();
            var container = document.querySelector('.edit-category-pills');
            if (!container) return;
            container.innerHTML = cats.map(function(c) {
                var activeClass = c.id === selectedCategory ? ' active' : '';
                return '<button class="pill' + activeClass + '" data-category="' + c.id + '" style="--pill-color:' + c.color + '">' + catBtnLabel(c.name) + '</button>';
            }).join('');
            // Re-attach click handlers
            container.querySelectorAll('.pill').forEach(function(pill) {
                pill.addEventListener('click', function() {
                    container.querySelectorAll('.pill').forEach(function(p) { p.classList.remove('active'); });
                    this.classList.add('active');
                });
            });
        }

        function openEditOutcome(outcomeId) {
            var outcome = data.outcomes.find(function(o) { return o.id === outcomeId; });
            if (!outcome) return;
            editingOutcomeId = outcomeId;
            document.getElementById('editOutcomeResult').value = outcome.result;
            document.getElementById('editOutcomePurpose').value = outcome.purpose;
            document.getElementById('editOutcomeDeadline').value = outcome.deadline || '';
            document.getElementById('editCommitmentSlider').value = outcome.commitment || 7;
            document.getElementById('editCommitmentValue').textContent = outcome.commitment || 7;
            // Dynamically render category pills for current mode
            renderEditCategoryPills(outcome.category);
            document.getElementById('editOutcomeOverlay').classList.remove('hidden');
        }

        safeBind('closeEditOutcome', 'click', function() {
            document.getElementById('editOutcomeOverlay').classList.add('hidden');
        });

        safeBind('btnSaveEditOutcome', 'click', function() {
            var outcome = data.outcomes.find(function(o) { return o.id === editingOutcomeId; });
            if (!outcome) return;
            outcome.result = document.getElementById('editOutcomeResult').value.trim();
            outcome.purpose = document.getElementById('editOutcomePurpose').value.trim();
            outcome.deadline = document.getElementById('editOutcomeDeadline').value || null;
            outcome.commitment = parseInt(document.getElementById('editCommitmentSlider').value);
            var activePill = document.querySelector('.edit-category-pills .pill.active');
            if (activePill) outcome.category = activePill.dataset.category;
            saveData();
            render();
            document.getElementById('editOutcomeOverlay').classList.add('hidden');
        });

        // Add Action Modal
        var addingToOutcomeId = null;

        function openAddAction(outcomeId) {
            var outcome = data.outcomes.find(function(o) { return o.id === outcomeId; });
            if (!outcome) return;
            addingToOutcomeId = outcomeId;
            document.getElementById('addActionOutcomeName').textContent = 'Adding to: ' + outcome.result;
            document.getElementById('addActionText').value = '';
            renderActionCategoryCheckboxes('addActionCategories', []);
            document.getElementById('addActionEst').value = '15';
            document.getElementById('addActionOverlay').classList.remove('hidden');
        }

        safeBind('closeAddAction', 'click', function() {
            document.getElementById('addActionOverlay').classList.add('hidden');
        });

        safeBind('btnSaveAddAction', 'click', function() {
            var text = document.getElementById('addActionText').value.trim();
            if (!text) return;
            var estValue = parseInt(document.getElementById('addActionEst').value);
            if (!estValue || estValue < 1) {
                document.getElementById('addActionEst').classList.add('input-error');
                return;
            }
            document.getElementById('addActionEst').classList.remove('input-error');
            var outcome = data.outcomes.find(function(o) { return o.id === addingToOutcomeId; });
            if (!outcome) return;
            var addDeadlineVal = document.getElementById('addActionDeadline').value || null;
            if (!addDeadlineVal) {
                var d7 = new Date();
                d7.setDate(d7.getDate() + 7);
                addDeadlineVal = d7.toISOString().split('T')[0];
            }
            outcome.actions.push({
                id: uid(),
                text: text,
                categories: getCheckedCategories('addActionCategories'),
                estMinutes: estValue || 15,
                deadline: addDeadlineVal,
                done: false,
                completedDate: null
            });
            if (outcome.completed) outcome.completed = false;
            saveData();
            render();
            document.getElementById('addActionOverlay').classList.add('hidden');
        });

        // Pomodoro
        safeBind('btnStartPomodoro', 'click', function() {
            if (!requirePro('focus_timer')) return;
            startPomodoro();
        });
        safeBind('btnStopPomodoro', 'click', stopPomodoro);

        // Task Timer
        safeBind('btnStartTaskTimer', 'click', function() {
            if (!requirePro('task_timer')) return;
            startTaskTimer();
        });
        safeBind('btnStopTaskTimer', 'click', stopTaskTimer);
        safeBind('btnPauseTaskTimer', 'click', pauseTaskTimer);
        safeBind('btnResumeTaskTimer', 'click', resumeTaskTimer);

        // Task Check-in
        safeBind('btnCheckInYes', 'click', handleCheckInYes);
        safeBind('btnCheckInNo', 'click', handleCheckInNo);

        // Pick for Me — pick top task from least-used category, show in Just Do window
        safeBind('btnPickForMe', 'click', function() {
            if (!requirePro('pick_for_me')) return;
            var picked = pickFromLeastUsedCategory();
            if (picked) {
                // Force this task into the Just Do This One Thing card
                forcedNextAction = picked;
                // Update category filter to reflect where the task comes from
                var cat = picked.category;
                var filterBtns = document.querySelectorAll('.focus-cat-btn');
                filterBtns.forEach(function(b) { b.classList.remove('active'); });
                var targetBtn = document.querySelector('.focus-cat-btn[data-focus-cat="' + cat + '"]');
                if (targetBtn) targetBtn.classList.add('active');
                currentFilter = cat;
                renderNextAction();
                // Scroll to top to see the task
                document.getElementById('nextActionCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                showPickForMe();
            }
        });
        safeBind('closePickForMe', 'click', function() {
            document.getElementById('pickForMeOverlay').classList.add('hidden');
        });
        document.querySelectorAll('.time-option-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.time-option-btn').forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                document.getElementById('btnStartPickedTask').style.display = '';
                pickTaskForTime(parseInt(this.dataset.minutes));
            });
        });
        safeBind('btnStartPickedTask', 'click', startPickedTask);

        // Movement modal
        safeBind('btnMovementDone', 'click', function() {
            addExercisesToHealthOutcome();
            document.getElementById('movementOverlay').classList.add('hidden');
        });
        safeBind('btnMovementSkip', 'click', function() {
            document.getElementById('movementOverlay').classList.add('hidden');
        });

        // ==========================================
        //  STUCK? QUICK RESET — Dynamic Activity System
        // ==========================================
        var stuckBreathInterval = null;
        var stuckActiveIntervals = [];
        var stuckShownHistory = [];

        // All available reset activities
        var STUCK_ACTIVITIES = [
            {
                id: 'breathe478',
                icon: '\uD83E\uDEC1',
                label: 'Breathe 4-7-8',
                desc: 'Calming breath pattern (1 min)',
                run: function(content) {
                    content.innerHTML = '<h3>4-7-8 Breathing</h3>' +
                        '<p style="color:var(--text-secondary);margin-bottom:12px">Follow the circle. In through nose, hold, out through mouth.</p>' +
                        '<div class="stuck-breathe-circle" id="breatheCircle">Breathe In</div>' +
                        '<p id="breatheCount" style="color:var(--text-muted);font-size:0.85rem;margin-top:8px">Round 1 of 3</p>';
                    var circle = document.getElementById('breatheCircle');
                    var countEl = document.getElementById('breatheCount');
                    var round = 0;
                    var maxRounds = 3;
                    function doRound() {
                        if (round >= maxRounds) {
                            circle.textContent = '\u2728 Done!';
                            circle.className = 'stuck-breathe-circle';
                            countEl.textContent = 'Great job! Feel that calm?';
                            return;
                        }
                        round++;
                        countEl.textContent = 'Round ' + round + ' of ' + maxRounds;
                        circle.textContent = 'Breathe In';
                        circle.className = 'stuck-breathe-circle inhale';
                        stuckBreathInterval = setTimeout(function() {
                            circle.textContent = 'Hold...';
                            circle.className = 'stuck-breathe-circle';
                        }, 4000);
                        stuckActiveIntervals.push(setTimeout(function() {
                            circle.textContent = 'Breathe Out';
                            circle.className = 'stuck-breathe-circle exhale';
                        }, 11000));
                        stuckActiveIntervals.push(setTimeout(function() {
                            doRound();
                        }, 19000));
                    }
                    doRound();
                }
            },
            {
                id: 'dance',
                icon: '\u2728',
                label: 'Joy Break',
                desc: 'Dance, move, feel alive — Brain Like A Pinball!',
                run: function(content) {
                    content.innerHTML = '<h3 class="joy-title-pulse">\u2728 DANCE \u2728</h3>' +
                        '<div class="stuck-dance-area" id="danceEmoji">\uD83D\uDC83</div>' +
                        '<div id="dancePrompt" class="dance-prompt dance-prompt-flash">DANCE!</div>' +
                        '<p id="danceTimer" style="font-size:1.5rem;font-weight:700;color:var(--accent-primary)">2:53</p>' +
                        '<audio id="danceAudio"><source src="audio/brain-like-a-pinball.mp3" type="audio/mpeg"></audio>';
                    var danceAudioEl = document.getElementById('danceAudio');
                    if (danceAudioEl) { try { danceAudioEl.play(); } catch(e) {} }
                    var emojis = ['\uD83D\uDC83', '\uD83D\uDD7A', '\uD83E\uDD38', '\uD83C\uDF89', '\uD83C\uDF1F', '\uD83E\uDD29', '\uD83D\uDE80', '\uD83C\uDF08'];
                    var prompts = [
                        { text: 'DANCE!', color: '#c07a73' },
                        { text: 'MOVE!', color: '#c4996a' },
                        { text: 'JUMP!', color: '#6aad99' },
                        { text: 'SMILE!', color: '#6a9dba' },
                        { text: 'ENJOY!', color: '#7c6fba' }
                    ];
                    var danceEl = document.getElementById('danceEmoji');
                    var promptEl = document.getElementById('dancePrompt');
                    var timerEl = document.getElementById('danceTimer');
                    var sec = 173; var idx = 0; var promptIdx = 0;
                    promptEl.style.color = prompts[0].color;
                    var promptInt = setInterval(function() {
                        promptIdx = (promptIdx + 1) % prompts.length;
                        promptEl.textContent = prompts[promptIdx].text;
                        promptEl.style.color = prompts[promptIdx].color;
                        promptEl.classList.remove('dance-prompt-flash');
                        void promptEl.offsetWidth;
                        promptEl.classList.add('dance-prompt-flash');
                    }, 3000);
                    stuckActiveIntervals.push(promptInt);
                    var danceInt = setInterval(function() {
                        sec--;
                        var m = Math.floor(sec / 60);
                        var s = sec % 60;
                        timerEl.textContent = m + ':' + (s < 10 ? '0' + s : s);
                        idx = (idx + 1) % emojis.length;
                        danceEl.textContent = emojis[idx];
                        if (sec <= 0) {
                            clearInterval(danceInt);
                            clearInterval(promptInt);
                            danceEl.textContent = '\uD83C\uDF89';
                            danceEl.style.animation = 'none';
                            promptEl.textContent = 'AMAZING!';
                            promptEl.style.color = '#c4996a';
                            promptEl.classList.remove('dance-prompt-flash');
                            timerEl.textContent = 'Pure joy! You felt that!';
                            var da = document.getElementById('danceAudio');
                            if (da) { da.pause(); da.currentTime = 0; }
                        }
                    }, 1000);
                    stuckActiveIntervals.push(danceInt);
                }
            },
            {
                id: 'laugh',
                icon: '\uD83E\uDD23',
                label: 'Laugh It Out',
                desc: 'Contagious kids laughing',
                run: function(content) {
                    content.innerHTML = '<h3>Laugh It Out! \uD83E\uDD23</h3>' +
                        '<p style="color:var(--text-secondary);margin-bottom:8px">Kids laughing is scientifically contagious. Try not to smile!</p>' +
                        '<div class="stuck-laugh-area">' +
                        '<div style="font-size:3rem;margin-bottom:12px">\uD83D\uDE02</div>' +
                        '<audio id="laughAudio" controls loop><source src="audio/kids-laughing.mp3" type="audio/mpeg">Your browser does not support audio.</audio>' +
                        '</div>';
                    var laughEl = document.getElementById('laughAudio');
                    if (laughEl) { try { laughEl.play(); } catch(e) {} }
                }
            },
            {
                id: 'boxBreathing',
                icon: '\u2B1C',
                label: 'Box Breathing',
                desc: '4-4-4-4 calm your nervous system',
                run: function(content) {
                    content.innerHTML = '<h3>Box Breathing \u2B1C</h3>' +
                        '<p style="color:var(--text-secondary);margin-bottom:12px">Equal breaths. In 4, hold 4, out 4, hold 4.</p>' +
                        '<div class="stuck-breathe-circle" id="boxCircle">Breathe In</div>' +
                        '<p id="boxCount" style="color:var(--text-muted);font-size:0.85rem;margin-top:8px">Round 1 of 4</p>';
                    var circle = document.getElementById('boxCircle');
                    var countEl = document.getElementById('boxCount');
                    var round = 0;
                    var maxRounds = 4;
                    function doBoxRound() {
                        if (round >= maxRounds) {
                            circle.textContent = '\u2728 Done!';
                            circle.className = 'stuck-breathe-circle';
                            countEl.textContent = 'Nervous system reset complete!';
                            return;
                        }
                        round++;
                        countEl.textContent = 'Round ' + round + ' of ' + maxRounds;
                        circle.textContent = 'Breathe In';
                        circle.className = 'stuck-breathe-circle inhale';
                        stuckActiveIntervals.push(setTimeout(function() {
                            circle.textContent = 'Hold...';
                            circle.className = 'stuck-breathe-circle';
                        }, 4000));
                        stuckActiveIntervals.push(setTimeout(function() {
                            circle.textContent = 'Breathe Out';
                            circle.className = 'stuck-breathe-circle exhale';
                        }, 8000));
                        stuckActiveIntervals.push(setTimeout(function() {
                            circle.textContent = 'Hold...';
                            circle.className = 'stuck-breathe-circle';
                        }, 12000));
                        stuckActiveIntervals.push(setTimeout(function() {
                            doBoxRound();
                        }, 16000));
                    }
                    doBoxRound();
                }
            },
            {
                id: 'physiologicalSigh',
                icon: '\uD83D\uDCA8',
                label: 'Physiological Sigh',
                desc: 'Fastest stress reset \u2014 1 breath (Stanford)',
                run: function(content) {
                    content.innerHTML = '<h3>Physiological Sigh \uD83D\uDCA8</h3>' +
                        '<p style="color:var(--text-secondary);margin-bottom:12px">Dr. Huberman\'s fastest calm-down: double inhale + long exhale.</p>' +
                        '<div class="stuck-breathe-circle" id="sighCircle" style="background:linear-gradient(135deg,#00b8d4,#0097a7)">Ready?</div>' +
                        '<p id="sighStep" style="font-size:1rem;font-weight:600;color:var(--accent-primary);margin-top:12px">Tap to start</p>';
                    var circle = document.getElementById('sighCircle');
                    var stepEl = document.getElementById('sighStep');
                    var rep = 0;
                    var maxReps = 5;
                    function doSigh() {
                        if (rep >= maxReps) {
                            circle.textContent = '\u2728 Done!';
                            circle.className = 'stuck-breathe-circle';
                            stepEl.textContent = 'Cortisol cleared. You\'re reset!';
                            return;
                        }
                        rep++;
                        stepEl.textContent = 'Sigh ' + rep + ' of ' + maxReps;
                        circle.textContent = 'Inhale\u2026';
                        circle.className = 'stuck-breathe-circle inhale';
                        stuckActiveIntervals.push(setTimeout(function() {
                            circle.textContent = '+ Sip!';
                        }, 2000));
                        stuckActiveIntervals.push(setTimeout(function() {
                            circle.textContent = 'Exhale\u2026\u2026';
                            circle.className = 'stuck-breathe-circle exhale';
                        }, 3500));
                        stuckActiveIntervals.push(setTimeout(function() {
                            doSigh();
                        }, 8000));
                    }
                    doSigh();
                }
            },
            {
                id: 'grounding54321',
                icon: '\uD83D\uDD90\uFE0F',
                label: '5-4-3-2-1 Grounding',
                desc: 'Engage all 5 senses to reset',
                run: function(content) {
                    var steps = [
                        { num: 5, sense: 'SEE', prompt: 'Look around. Name 5 things you can see right now.', emoji: '\uD83D\uDC41\uFE0F' },
                        { num: 4, sense: 'HEAR', prompt: 'Pause and listen. Name 4 things you can hear.', emoji: '\uD83D\uDC42' },
                        { num: 3, sense: 'TOUCH', prompt: 'Name 3 things you can physically feel right now.', emoji: '\u270B' },
                        { num: 2, sense: 'SMELL', prompt: 'Name 2 things you can smell (or go smell something).', emoji: '\uD83D\uDC43' },
                        { num: 1, sense: 'TASTE', prompt: 'Name 1 thing you can taste (or take a sip of water).', emoji: '\uD83D\uDC45' }
                    ];
                    var stepIdx = 0;
                    function renderStep() {
                        var s = steps[stepIdx];
                        content.innerHTML = '<h3>5-4-3-2-1 Grounding \uD83D\uDD90\uFE0F</h3>' +
                            '<div style="font-size:3rem;margin:16px 0">' + s.emoji + '</div>' +
                            '<p style="font-size:1.3rem;font-weight:700;color:var(--accent-primary)">' + s.num + ' things you can ' + s.sense + '</p>' +
                            '<p style="color:var(--text-secondary);margin:8px 0 20px">' + s.prompt + '</p>' +
                            '<p style="color:var(--text-muted);font-size:0.85rem">Step ' + (stepIdx + 1) + ' of 5</p>' +
                            (stepIdx < 4 ? '<button class="btn-primary" id="groundingNext" style="margin-top:12px">Next \u2192</button>' :
                            '<p style="font-size:1.2rem;font-weight:700;color:var(--accent-green);margin-top:12px">\u2728 You\'re grounded. You\'re here. You\'re okay.</p>');
                        var nextBtn = document.getElementById('groundingNext');
                        if (nextBtn) nextBtn.addEventListener('click', function() { stepIdx++; renderStep(); });
                    }
                    renderStep();
                }
            },
            {
                id: 'coldSplash',
                icon: '\uD83E\uDDCA',
                label: 'Cold Reset',
                desc: 'Splash cold water — vagus nerve hack',
                run: function(content) {
                    content.innerHTML = '<h3>Cold Reset \uD83E\uDDCA</h3>' +
                        '<p style="color:var(--text-secondary);margin-bottom:16px">This activates the mammalian diving reflex \u2014 instant calm.</p>' +
                        '<div style="font-size:4rem;margin:16px 0">\uD83E\uDDCA</div>' +
                        '<div style="background:rgba(0,184,212,0.1);border-radius:12px;padding:16px;text-align:left;margin-bottom:12px">' +
                        '<p style="font-weight:700;margin-bottom:8px">Do one of these NOW:</p>' +
                        '<p>\uD83D\uDCA7 Splash cold water on your face (best)</p>' +
                        '<p>\uD83E\uDDCA Hold an ice cube in your hands for 30 sec</p>' +
                        '<p>\uD83D\uDEB0 Run cold water on your wrists for 20 sec</p>' +
                        '<p>\uD83E\uDDFB Press a cold wet towel on your neck</p>' +
                        '</div>' +
                        '<p id="coldTimer" style="font-size:1.5rem;font-weight:700;color:var(--accent-primary)">30</p>' +
                        '<p style="color:var(--text-muted);font-size:0.85rem">Timer counting down\u2026</p>';
                    var timerEl = document.getElementById('coldTimer');
                    var sec = 30;
                    var coldInt = setInterval(function() {
                        sec--; timerEl.textContent = sec;
                        if (sec <= 0) { clearInterval(coldInt); timerEl.textContent = '\u2728 Feel that reset?'; }
                    }, 1000);
                    stuckActiveIntervals.push(coldInt);
                }
            },
            {
                id: 'bodyShake',
                icon: '\uD83E\uDEBB',
                label: 'Shake It Off',
                desc: 'Full song body shake — Brain Like A Pinball!',
                run: function(content) {
                    content.innerHTML = '<h3>\uD83C\uDFB5 Shake It Off! \uD83E\uDEBB</h3>' +
                        '<p style="color:var(--text-secondary);margin-bottom:12px">Shake your whole body for the entire song! Release that stress!</p>' +
                        '<div class="stuck-dance-area" id="shakeEmoji" style="animation:danceWiggle 0.15s infinite alternate">\uD83E\uDEBB</div>' +
                        '<p id="shakeTimer" style="font-size:1.5rem;font-weight:700;color:var(--accent-primary)">2:53</p>' +
                        '<div style="background:rgba(108,92,231,0.08);border-radius:12px;padding:12px;margin-top:12px;text-align:left;font-size:0.9rem">' +
                        '<p>\uD83D\uDC4B Shake your hands vigorously</p>' +
                        '<p>\uD83E\uDDB6 Bounce on your feet</p>' +
                        '<p>\uD83D\uDCAA Shake your arms and shoulders</p>' +
                        '<p>\uD83C\uDFB5 Let your whole body wiggle!</p>' +
                        '</div>' +
                        '<audio id="danceAudio"><source src="audio/brain-like-a-pinball.mp3" type="audio/mpeg"></audio>';
                    var shakeAudioEl = document.getElementById('danceAudio');
                    if (shakeAudioEl) { try { shakeAudioEl.play(); } catch(e) {} }
                    var timerEl = document.getElementById('shakeTimer');
                    var emojis = ['\uD83E\uDEBB', '\uD83D\uDCAA', '\uD83E\uDD38', '\uD83C\uDFB5', '\uD83D\uDC4B', '\uD83E\uDEBB'];
                    var shakeEl = document.getElementById('shakeEmoji');
                    var sec = 173; var idx = 0;
                    var shakeInt = setInterval(function() {
                        sec--;
                        var m = Math.floor(sec / 60);
                        var s = sec % 60;
                        timerEl.textContent = m + ':' + (s < 10 ? '0' + s : s);
                        idx = (idx + 1) % emojis.length;
                        shakeEl.textContent = emojis[idx];
                        if (sec <= 0) {
                            clearInterval(shakeInt);
                            shakeEl.textContent = '\uD83C\uDF89';
                            shakeEl.style.animation = 'none';
                            timerEl.textContent = 'Stress discharged! You rocked it!';
                            var _sa = document.getElementById('danceAudio');
                            if (_sa) { _sa.pause(); _sa.currentTime = 0; }
                        }
                    }, 1000);
                    stuckActiveIntervals.push(shakeInt);
                }
            },
            {
                id: 'butterflyHug',
                icon: '\uD83E\uDD8B',
                label: 'Butterfly Hug',
                desc: 'Bilateral tapping for instant calm',
                run: function(content) {
                    content.innerHTML = '<h3>Butterfly Hug \uD83E\uDD8B</h3>' +
                        '<p style="color:var(--text-secondary);margin-bottom:12px">Cross your arms, hands on shoulders. Alternate tapping left-right.</p>' +
                        '<div id="butterflyEmoji" style="font-size:4rem;margin:16px 0;transition:transform 0.3s">\uD83E\uDD8B</div>' +
                        '<p id="butterflyGuide" style="font-size:1.1rem;font-weight:600;color:var(--accent-primary)">Tap LEFT</p>' +
                        '<p id="butterflyTimer" style="color:var(--text-muted);font-size:0.85rem;margin-top:8px">60 seconds</p>';
                    var emoji = document.getElementById('butterflyEmoji');
                    var guide = document.getElementById('butterflyGuide');
                    var timerEl = document.getElementById('butterflyTimer');
                    var sec = 60; var isLeft = true;
                    var bfInt = setInterval(function() {
                        sec--;
                        isLeft = !isLeft;
                        emoji.style.transform = isLeft ? 'rotate(-15deg)' : 'rotate(15deg)';
                        guide.textContent = isLeft ? 'Tap LEFT' : 'Tap RIGHT';
                        timerEl.textContent = sec + ' seconds';
                        if (sec <= 0) {
                            clearInterval(bfInt);
                            emoji.style.transform = 'none';
                            guide.textContent = '\u2728 Both hemispheres balanced!';
                            timerEl.textContent = 'You did great!';
                        }
                    }, 1000);
                    stuckActiveIntervals.push(bfInt);
                }
            },
            {
                id: 'brainDump',
                icon: '\uD83E\uDDE0',
                label: 'Brain Dump',
                desc: 'Empty your head onto paper (2 min)',
                run: function(content) {
                    content.innerHTML = '<h3>Brain Dump \uD83E\uDDE0</h3>' +
                        '<p style="color:var(--text-secondary);margin-bottom:12px">Write EVERYTHING in your head. Don\'t filter. Just dump it out.</p>' +
                        '<textarea id="brainDumpArea" class="input-field textarea" style="width:100%;min-height:120px;font-size:1rem;margin-bottom:12px" placeholder="Type everything here\u2026 every worry, thought, task, idea. Don\'t stop writing for 2 minutes."></textarea>' +
                        '<p id="dumpTimer" style="font-size:1.3rem;font-weight:700;color:var(--accent-primary)">2:00</p>' +
                        '<p style="color:var(--text-muted);font-size:0.85rem">Keep writing until the timer ends!</p>';
                    var timerEl = document.getElementById('dumpTimer');
                    var area = document.getElementById('brainDumpArea');
                    if (area) area.focus();
                    var sec = 120;
                    var dumpInt = setInterval(function() {
                        sec--;
                        var m = Math.floor(sec / 60);
                        var s = sec % 60;
                        timerEl.textContent = m + ':' + (s < 10 ? '0' : '') + s;
                        if (sec <= 0) {
                            clearInterval(dumpInt);
                            timerEl.textContent = '\u2728 Feel lighter?';
                        }
                    }, 1000);
                    stuckActiveIntervals.push(dumpInt);
                }
            },
            {
                id: 'selfCompassion',
                icon: '\uD83D\uDC9A',
                label: 'Self-Compassion',
                desc: 'Break the shame spiral (Dr. Neff)',
                run: function(content) {
                    var steps = [
                        { title: 'Step 1: Acknowledge', emoji: '\uD83E\uDD32', text: 'Say to yourself: "This is a moment of struggle. This is hard right now."', sub: 'Don\'t minimize it. Don\'t dramatize it. Just notice.' },
                        { title: 'Step 2: You\'re Not Alone', emoji: '\uD83E\uDD1D', text: 'Say: "Other people with ADHD feel this exact same way. This is part of the human experience."', sub: 'You are not broken. Your brain just works differently.' },
                        { title: 'Step 3: Be Kind', emoji: '\uD83D\uDC9A', text: 'Say: "May I be kind to myself right now. I\'m doing my best with the brain I have."', sub: 'Place your hand on your heart. Mean it.' }
                    ];
                    var stepIdx = 0;
                    function renderCompassionStep() {
                        var s = steps[stepIdx];
                        content.innerHTML = '<h3>Self-Compassion Pause \uD83D\uDC9A</h3>' +
                            '<div style="font-size:3rem;margin:12px 0">' + s.emoji + '</div>' +
                            '<p style="font-size:1.1rem;font-weight:700;color:var(--accent-primary);margin-bottom:8px">' + s.title + '</p>' +
                            '<p style="font-size:1rem;margin-bottom:8px;color:var(--text-primary)">' + s.text + '</p>' +
                            '<p style="color:var(--text-muted);font-size:0.85rem;font-style:italic;margin-bottom:16px">' + s.sub + '</p>' +
                            (stepIdx < 2 ? '<button class="btn-primary" id="compassionNext">Next \u2192</button>' :
                            '<p style="font-size:1.1rem;font-weight:700;color:var(--accent-green);margin-top:12px">\u2728 You are enough. You always have been.</p>');
                        var nextBtn = document.getElementById('compassionNext');
                        if (nextBtn) nextBtn.addEventListener('click', function() { stepIdx++; renderCompassionStep(); });
                    }
                    renderCompassionStep();
                }
            },
            {
                id: 'microChunk',
                icon: '\uD83E\uDDE9',
                label: 'Micro-Chunk It',
                desc: 'Break your task into tiny bites',
                run: function(content) {
                    content.innerHTML = '<h3>Micro-Chunk It \uD83E\uDDE9</h3>' +
                        '<p style="color:var(--text-secondary);margin-bottom:12px">Your task feels huge? Let\'s make it absurdly tiny. What are you trying to do?</p>' +
                        '<input type="text" id="chunkTask" class="input-field" style="width:100%;margin-bottom:12px" placeholder="e.g., Write my essay">' +
                        '<div id="chunkSteps" style="text-align:left;margin-top:8px"></div>' +
                        '<button class="btn-primary" id="chunkGenerate" style="margin-top:12px">\uD83E\uDDE0 Break It Down</button>';
                    document.getElementById('chunkGenerate').addEventListener('click', function() {
                        var task = document.getElementById('chunkTask').value || 'your task';
                        var micro = [
                            '\u2705 Step 1: Open the app/file/document for "' + task + '"',
                            '\u2705 Step 2: Read/look at it for just 30 seconds',
                            '\u2705 Step 3: Do the SMALLEST first action (one line, one word, one click)',
                            '\u2705 Step 4: Do one more tiny thing',
                            '\u2705 Step 5: You\'re already in flow!'
                        ];
                        document.getElementById('chunkSteps').innerHTML = micro.map(function(s) {
                            return '<p style="padding:6px 0;border-bottom:1px solid var(--border)">' + s + '</p>';
                        }).join('');
                        document.getElementById('chunkGenerate').textContent = '\uD83C\uDF89 Now do Step 1!';
                    });
                }
            },
            {
                id: 'gratitude',
                icon: '\uD83D\uDE4F',
                label: 'Gratitude Boost',
                desc: 'Shift your brain chemistry in 60 sec',
                run: function(content) {
                    content.innerHTML = '<h3>Gratitude Boost \uD83D\uDE4F</h3>' +
                        '<p style="color:var(--text-secondary);margin-bottom:12px">Gratitude activates your reward pathways. Write 3 things \u2014 big or small.</p>' +
                        '<div style="text-align:left">' +
                        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><span style="font-size:1.3rem">\u2728</span><input type="text" class="input-field" style="flex:1" id="grat1" placeholder="I\'m grateful for\u2026"></div>' +
                        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><span style="font-size:1.3rem">\uD83D\uDC9B</span><input type="text" class="input-field" style="flex:1" id="grat2" placeholder="I appreciate\u2026"></div>' +
                        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><span style="font-size:1.3rem">\uD83C\uDF1F</span><input type="text" class="input-field" style="flex:1" id="grat3" placeholder="Something good today\u2026"></div>' +
                        '</div>' +
                        '<p id="gratResult" style="color:var(--accent-green);font-weight:700;margin-top:12px;display:none">\u2728 Dopamine + serotonin activated! Your brain thanks you.</p>';
                    var inputs = [document.getElementById('grat1'), document.getElementById('grat2'), document.getElementById('grat3')];
                    inputs.forEach(function(inp) {
                        if (inp) inp.addEventListener('input', function() {
                            var filled = inputs.filter(function(i) { return i && i.value.trim(); }).length;
                            if (filled >= 3) document.getElementById('gratResult').style.display = '';
                        });
                    });
                    if (inputs[0]) inputs[0].focus();
                }
            },
            {
                id: 'positiveTalk',
                icon: '\uD83D\uDCAC',
                label: 'Reframe It',
                desc: 'Replace negative self-talk (CBT)',
                run: function(content) {
                    var reframes = [
                        { neg: '"I\'m so lazy"', pos: '"My brain needs more dopamine to start. That\'s neuroscience, not laziness."' },
                        { neg: '"I always fail"', pos: '"I struggle with follow-through, AND I keep trying. That takes courage."' },
                        { neg: '"Everyone else can do this easily"', pos: '"I\'m comparing my behind-the-scenes to their highlight reel."' },
                        { neg: '"What\'s wrong with me?"', pos: '"My brain is wired differently. Different \u2260 defective."' },
                        { neg: '"I\'ll never get this done"', pos: '"I can do the next small piece. That\'s all I need to focus on."' },
                        { neg: '"I should be further along"', pos: '"I\'m exactly where I am, and I\'m still moving forward."' }
                    ];
                    var r = reframes[Math.floor(Math.random() * reframes.length)];
                    content.innerHTML = '<h3>Reframe It \uD83D\uDCAC</h3>' +
                        '<p style="color:var(--text-secondary);margin-bottom:16px">Your thoughts aren\'t facts. Let\'s rewrite that script.</p>' +
                        '<div style="background:rgba(192,122,115,0.08);border-radius:12px;padding:16px;margin-bottom:12px">' +
                        '<p style="color:#c07a73;font-size:0.8rem;font-weight:700;margin-bottom:4px">THE OLD STORY</p>' +
                        '<p style="font-size:1.1rem;font-style:italic">' + r.neg + '</p>' +
                        '</div>' +
                        '<div style="font-size:1.5rem;margin:8px 0">\u2B07\uFE0F</div>' +
                        '<div style="background:rgba(0,210,160,0.08);border-radius:12px;padding:16px">' +
                        '<p style="color:var(--accent-green);font-size:0.8rem;font-weight:700;margin-bottom:4px">THE TRUTH</p>' +
                        '<p style="font-size:1.1rem;font-weight:600">' + r.pos + '</p>' +
                        '</div>' +
                        '<p style="color:var(--text-muted);font-size:0.85rem;margin-top:16px;font-style:italic">Say the new version out loud 3 times. Your brain needs to hear it.</p>';
                }
            },
            {
                id: 'nameItTameIt',
                icon: '\uD83C\uDFF7\uFE0F',
                label: 'Name It to Tame It',
                desc: 'Label your emotion to calm it down',
                run: function(content) {
                    var emotions = [
                        { emoji: '\uD83D\uDE24', name: 'Frustrated', tip: 'Frustration means you care. Take one step back from the problem.' },
                        { emoji: '\uD83D\uDE30', name: 'Anxious', tip: 'Anxiety lives in the future. Come back to right now with a deep breath.' },
                        { emoji: '\uD83D\uDE29', name: 'Overwhelmed', tip: 'Too many things at once. Pick ONE. The rest can wait.' },
                        { emoji: '\uD83D\uDE14', name: 'Ashamed', tip: 'Shame says "I am bad." Truth: you have a brain difference, not a character flaw.' },
                        { emoji: '\uD83D\uDE34', name: 'Drained', tip: 'Your battery is low. Rest IS productive. Even 5 minutes helps.' },
                        { emoji: '\uD83D\uDE10', name: 'Numb / Blank', tip: 'Your brain shut down to protect you. Be gentle. Start with something sensory.' },
                        { emoji: '\uD83D\uDE20', name: 'Angry', tip: 'Anger is a signal something matters to you. What boundary was crossed?' },
                        { emoji: '\uD83D\uDE1E', name: 'Disappointed', tip: 'You had expectations. It\'s okay to grieve them. Then adjust and keep going.' }
                    ];
                    var btns = emotions.map(function(e, i) {
                        return '<button class="stuck-option" data-emo="' + i + '" style="padding:10px 14px">' +
                            '<span style="font-size:1.5rem">' + e.emoji + '</span>' +
                            '<span><span class="stuck-label" style="font-size:0.9rem">' + e.name + '</span></span></button>';
                    }).join('');
                    content.innerHTML = '<h3>Name It to Tame It \uD83C\uDFF7\uFE0F</h3>' +
                        '<p style="color:var(--text-secondary);margin-bottom:12px">Naming your emotion activates your prefrontal cortex and calms the amygdala.</p>' +
                        '<p style="font-weight:600;margin-bottom:8px">What are you feeling right now?</p>' +
                        '<div class="stuck-options" style="gap:8px">' + btns + '</div>';
                    content.querySelectorAll('[data-emo]').forEach(function(btn) {
                        btn.addEventListener('click', function() {
                            var e = emotions[parseInt(this.getAttribute('data-emo'))];
                            content.innerHTML = '<div style="font-size:3rem;margin:12px 0">' + e.emoji + '</div>' +
                                '<h3>"I\'m feeling ' + e.name + '"</h3>' +
                                '<div style="background:rgba(0,210,160,0.08);border-radius:12px;padding:16px;margin:16px 0">' +
                                '<p style="font-size:1rem">' + e.tip + '</p></div>' +
                                '<p style="color:var(--text-muted);font-size:0.85rem;font-style:italic">\u2728 You named it. Your prefrontal cortex just came back online.</p>';
                        });
                    });
                }
            },
            {
                id: 'sensoryReset',
                icon: '\uD83C\uDF3F',
                label: 'Sensory Reset',
                desc: 'Change your environment in 30 seconds',
                run: function(content) {
                    var tips = [
                        '\uD83E\uDE9F Open a window \u2014 fresh air changes everything',
                        '\uD83D\uDCA1 Change your lighting \u2014 brighter or dimmer',
                        '\uD83C\uDFB5 Put on a completely different kind of music',
                        '\uD83E\uDDCA Run cold water on your wrists for 15 seconds',
                        '\uD83C\uDF4B Smell something strong \u2014 peppermint, coffee, citrus',
                        '\uD83E\uDDF9 Clear 3 things off your desk right now',
                        '\uD83D\uDC5F Take off your shoes and feel the floor',
                        '\uD83D\uDCA7 Drink a full glass of cold water'
                    ];
                    // Shuffle and pick 4
                    var shuffled = tips.sort(function() { return 0.5 - Math.random(); }).slice(0, 4);
                    content.innerHTML = '<h3>Sensory Reset \uD83C\uDF3F</h3>' +
                        '<p style="color:var(--text-secondary);margin-bottom:12px">Your ADHD brain craves novelty. Change your senses to change your state.</p>' +
                        '<div style="text-align:left;margin-bottom:16px">' +
                        shuffled.map(function(t) {
                            return '<p style="padding:8px 0;border-bottom:1px solid var(--border);font-size:0.95rem">' + t + '</p>';
                        }).join('') +
                        '</div>' +
                        '<p style="font-weight:700;color:var(--accent-primary)">Do at least ONE right now \u2014 then come back!</p>';
                }
            },
            {
                id: 'thankYourself',
                icon: '\uD83D\uDC9B',
                label: 'Thank Yourself',
                desc: 'Gratitude for what you did today',
                run: function(content) {
                    var affirmations = [
                        'You showed up. That matters more than you think.',
                        'Your future self is already grateful.',
                        'You did that. Nobody can take it away.',
                        'Small steps still move you forward.',
                        'You deserve to hear this: well done.',
                        'The fact that you\'re here means you care. That\'s huge.'
                    ];
                    content.innerHTML = '<h3>\uD83D\uDC9B Thank Yourself</h3>' +
                        '<p style="color:var(--text-secondary);margin-bottom:12px">Write 1\u20133 things you did today that deserve recognition.</p>' +
                        '<div style="text-align:left">' +
                        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><span style="font-size:1.3rem">1.</span><input type="text" class="input-field" style="flex:1" id="thankInline1" placeholder="I showed up and\u2026"></div>' +
                        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><span style="font-size:1.3rem">2.</span><input type="text" class="input-field" style="flex:1" id="thankInline2" placeholder="I also\u2026"></div>' +
                        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><span style="font-size:1.3rem">3.</span><input type="text" class="input-field" style="flex:1" id="thankInline3" placeholder="And I\u2026"></div>' +
                        '</div>' +
                        '<button class="btn-primary" id="thankInlineSubmit" style="margin-top:8px">\uD83D\uDC9B Say Thanks</button>' +
                        '<div id="thankInlineResult" style="display:none;margin-top:12px"></div>';
                    var i1 = document.getElementById('thankInline1');
                    if (i1) setTimeout(function() { i1.focus(); }, 200);
                    document.getElementById('thankInlineSubmit').addEventListener('click', function() {
                        var inputs = [document.getElementById('thankInline1'), document.getElementById('thankInline2'), document.getElementById('thankInline3')];
                        var items = inputs.map(function(i) { return i ? i.value.trim() : ''; }).filter(function(v) { return v; });
                        if (items.length === 0) {
                            if (inputs[0]) { inputs[0].style.borderColor = '#f44336'; setTimeout(function() { inputs[0].style.borderColor = ''; }, 2000); }
                            return;
                        }
                        var affirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
                        var resultEl = document.getElementById('thankInlineResult');
                        var html = '';
                        items.forEach(function(item) { html += '<div style="padding:6px 0;border-bottom:1px solid var(--border)">\u201C' + item + '\u201D</div>'; });
                        html += '<p style="margin-top:12px;font-style:italic;color:var(--accent-primary)">' + affirmation + '</p>';
                        resultEl.innerHTML = html;
                        resultEl.style.display = '';
                        this.style.display = 'none';
                        if (typeof addXP === 'function') addXP(15, 'Self-gratitude');
                        if (typeof data !== 'undefined' && data.actionLog) {
                            data.actionLog.push({ action: 'Thanked myself: ' + items.join(', '), outcome: 'Self-Care', category: 'personal_growth', date: new Date().toISOString(), xp: 15 });
                            saveData();
                        }
                    });
                }
            }
        ];

        // Pick 3 random activities that haven't been shown recently
        function pickStuckActivities() {
            var available = STUCK_ACTIVITIES.filter(function(a) {
                return stuckShownHistory.indexOf(a.id) === -1;
            });
            // If we've shown too many, reset history (keep last 3 to avoid immediate repeat)
            if (available.length < 3) {
                stuckShownHistory = stuckShownHistory.slice(-3);
                available = STUCK_ACTIVITIES.filter(function(a) {
                    return stuckShownHistory.indexOf(a.id) === -1;
                });
            }
            // Shuffle and pick 3
            var shuffled = available.sort(function() { return 0.5 - Math.random(); });
            var picked = shuffled.slice(0, 3);
            picked.forEach(function(a) { stuckShownHistory.push(a.id); });
            return picked;
        }

        // Render 3 random option buttons into the container
        function renderStuckOptions() {
            var container = document.getElementById('stuckOptionsContainer');
            if (!container) return;
            var picked = pickStuckActivities();
            container.innerHTML = picked.map(function(a) {
                return '<button class="stuck-option" data-stuck-id="' + a.id + '">' +
                    '<span class="stuck-icon">' + a.icon + '</span>' +
                    '<span><span class="stuck-label">' + a.label + '</span>' +
                    '<span class="stuck-desc">' + a.desc + '</span></span></button>';
            }).join('');
            // Bind click handlers
            container.querySelectorAll('.stuck-option').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var id = this.getAttribute('data-stuck-id');
                    var act = STUCK_ACTIVITIES.filter(function(a) { return a.id === id; })[0];
                    if (!act) return;
                    container.style.display = 'none';
                    var header = document.getElementById('stuckHeader');
                    if (header) header.style.display = 'none';
                    var activity = document.getElementById('stuckActivity');
                    activity.classList.remove('hidden');
                    var content = document.getElementById('stuckActivityContent');
                    act.run(content);
                });
            });
        }

        safeBind('btnStuck', 'click', function() {
            document.getElementById('stuckOverlay').classList.remove('hidden');
            var header = document.getElementById('stuckHeader');
            if (header) header.style.display = '';
            var container = document.getElementById('stuckOptionsContainer');
            if (container) container.style.display = '';
            var activity = document.getElementById('stuckActivity');
            if (activity) activity.classList.add('hidden');
            renderStuckOptions();
        });

        // Joy button — instant dopamine hit via dance/movement
        safeBind('btnDanceBreak', 'click', function() {
            document.getElementById('stuckOverlay').classList.remove('hidden');
            var container = document.getElementById('stuckOptionsContainer');
            if (container) container.style.display = 'none';
            var activity = document.getElementById('stuckActivity');
            if (activity) activity.classList.remove('hidden');
            var content = document.getElementById('stuckActivityContent');
            // Find the joy/dance activity and run it directly
            var joyAct = STUCK_ACTIVITIES.filter(function(a) { return a.id === 'dance'; })[0];
            if (joyAct && content) joyAct.run(content);
        });

        // Thank Yourself button & modal
        safeBind('btnThankYourself', 'click', function() {
            var overlay = document.getElementById('thankYourselfOverlay');
            if (overlay) {
                overlay.classList.remove('hidden');
                // Reset form
                var i1 = document.getElementById('thankInput1');
                var i2 = document.getElementById('thankInput2');
                var i3 = document.getElementById('thankInput3');
                if (i1) { i1.value = ''; }
                if (i2) { i2.value = ''; }
                if (i3) { i3.value = ''; }
                var result = document.getElementById('thankYourselfResult');
                if (result) { result.classList.add('hidden'); result.innerHTML = ''; }
                var btn = document.getElementById('btnSubmitThanks');
                if (btn) { btn.style.display = ''; }
                // Focus first input
                setTimeout(function() { if (i1) i1.focus(); }, 200);
            }
        });

        safeBind('closeThankYourself', 'click', function() {
            var overlay = document.getElementById('thankYourselfOverlay');
            if (overlay) overlay.classList.add('hidden');
        });

        safeBind('btnSubmitThanks', 'click', function() {
            var i1 = document.getElementById('thankInput1');
            var i2 = document.getElementById('thankInput2');
            var i3 = document.getElementById('thankInput3');
            var t1 = i1 ? i1.value.trim() : '';
            var t2 = i2 ? i2.value.trim() : '';
            var t3 = i3 ? i3.value.trim() : '';

            // Need at least one entry
            if (!t1 && !t2 && !t3) {
                if (i1) { i1.style.borderColor = '#f44336'; setTimeout(function() { i1.style.borderColor = ''; }, 2000); }
                return;
            }

            var items = [];
            if (t1) items.push(t1);
            if (t2) items.push(t2);
            if (t3) items.push(t3);

            var affirmations = [
                'You showed up. That matters more than you think.',
                'Your future self is already grateful.',
                'You did that. Nobody can take it away.',
                'Small steps still move you forward.',
                'You deserve to hear this: well done.',
                'The fact that you\'re here means you care. That\'s huge.'
            ];
            var affirmation = affirmations[Math.floor(Math.random() * affirmations.length)];

            var resultEl = document.getElementById('thankYourselfResult');
            if (resultEl) {
                var html = '<h3>\uD83D\uDC9B Thank You, You!</h3>';
                items.forEach(function(item) {
                    html += '<div class="thank-item">\u201C' + item + '\u201D</div>';
                });
                html += '<p style="margin-top:12px;font-style:italic;color:var(--accent-primary)">' + affirmation + '</p>';
                resultEl.innerHTML = html;
                resultEl.classList.remove('hidden');
            }

            // Hide the submit button and inputs
            var btn = document.getElementById('btnSubmitThanks');
            if (btn) btn.style.display = 'none';

            // Award XP for self-care
            if (typeof addXP === 'function') {
                addXP(15, 'Self-gratitude');
            }

            // Save to action log as a self-care entry
            if (typeof data !== 'undefined' && data.actionLog) {
                data.actionLog.push({
                    action: 'Thanked myself: ' + items.join(', '),
                    outcome: 'Self-Care',
                    category: 'personal_growth',
                    date: new Date().toISOString(),
                    xp: 15
                });
                saveData();
            }
        });

        function closeStuckModal() {
            document.getElementById('stuckOverlay').classList.add('hidden');
            if (stuckBreathInterval) { clearTimeout(stuckBreathInterval); stuckBreathInterval = null; }
            // Clear all active timers/intervals
            stuckActiveIntervals.forEach(function(id) { clearTimeout(id); clearInterval(id); });
            stuckActiveIntervals = [];
            // Stop and destroy any playing audio completely
            ['laughAudio', 'danceAudio'].forEach(function(audioId) {
                var audio = document.getElementById(audioId);
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                    audio.src = '';
                    audio.removeAttribute('src');
                    audio.load();
                    if (audio.parentNode) audio.parentNode.removeChild(audio);
                }
            });
            // Clear activity content to prevent any residual playback
            var actContent = document.getElementById('stuckActivityContent');
            if (actContent) actContent.innerHTML = '';
        }

        safeBind('stuckDone', 'click', closeStuckModal);
        safeBind('closeStuck', 'click', closeStuckModal);

        // Extended break
        safeBind('btnStartExtendedBreak', 'click', startExtendedBreakTimer);
        safeBind('btnSkipExtendedBreak', 'click', function() {
            if (extendedBreakInterval) clearInterval(extendedBreakInterval);
            extendedBreakInterval = null;
            document.getElementById('extendedBreakOverlay').classList.add('hidden');
        });

        // State priming
        safeBind('btnSettings', 'click', function() {
            if (!requirePro('rituals')) return;
            document.getElementById('statePrimingOverlay').classList.remove('hidden');
        });
        safeBind('btnStartDay', 'click', function() {
            try {
                var primingKey = 'lwp_priming_times_' + new Date().toDateString();
                var primingTimes = JSON.parse(localStorage.getItem(primingKey) || '[]');
                primingTimes.push(Date.now());
                localStorage.setItem(primingKey, JSON.stringify(primingTimes));
            } catch(e) { console.error('priming save error:', e); }
            document.getElementById('statePrimingOverlay').classList.add('hidden');
        });
        safeBind('closePriming', 'click', function() {
            try {
                var primingKey = 'lwp_priming_times_' + new Date().toDateString();
                var primingTimes = JSON.parse(localStorage.getItem(primingKey) || '[]');
                primingTimes.push(Date.now());
                localStorage.setItem(primingKey, JSON.stringify(primingTimes));
            } catch(e) { console.error('priming save error:', e); }
            document.getElementById('statePrimingOverlay').classList.add('hidden');
        });

        // Priming timers
        document.querySelectorAll('.btn-timer').forEach(function(btn) {
            btn.addEventListener('click', function() {
                startPrimingTimer(this);
            });
        });

        // Energy slider
        safeBind('energySlider', 'input', function() {
            document.getElementById('energyValue').textContent = this.value;
        });

        // Weekly review
        safeBind('btnWeeklyReview', 'click', function() {
            if (!requirePro('weekly_review')) return;
            showWeeklyReview();
        });
        safeBind('closeWeeklyReview', 'click', function() {
            document.getElementById('weeklyReviewOverlay').classList.add('hidden');
        });
        safeBind('saveReflection', 'click', function() {
            var text = document.getElementById('weeklyReflection').value.trim();
            if (text) {
                data.reflections.push({ date: new Date().toDateString(), text: text });
                saveData();
                alert('Reflection saved!');
            }
        });

        // Archive button on outcome cards
        safeBind('outcomesGrid', 'click', function(e) {
            var archiveBtn = e.target.closest('.btn-archive-outcome');
            if (archiveBtn) {
                var oid = archiveBtn.dataset.outcomeId;
                if (oid && confirm('Archive this completed outcome?')) {
                    archiveOutcome(oid);
                }
            }
        });

        // Values modal
        safeBind('btnValues', 'click', function() {
            if (!requirePro('values')) return;
            showValuesModal();
        });
        safeBind('closeValues', 'click', function() {
            document.getElementById('valuesOverlay').classList.add('hidden');
        });
        safeBind('btnSaveValues', 'click', saveValues);

        // Business Pack modal
        var btnBP = document.getElementById('btnBusinessPack');
        if (btnBP) btnBP.addEventListener('click', showBusinessPack);
        safeBind('closeBusinessPack', 'click', function() {
            document.getElementById('businessPackOverlay').classList.add('hidden');
        });
        safeBind('btnNewBusinessOutcome', 'click', openNewBusinessOutcome);

        // Help guide modal
        var btnHelp = document.getElementById('btnHelp');
        if (btnHelp) btnHelp.addEventListener('click', function() {
            document.getElementById('helpOverlay').classList.remove('hidden');
        });
        safeBind('closeHelp', 'click', function() {
            document.getElementById('helpOverlay').classList.add('hidden');
        });

        // Evening Seed Planting modal
        safeBind('btnSaveSeed', 'click', function() {
            localStorage.setItem('lwp_evening_seed_' + new Date().toDateString(), 'done');
            document.getElementById('eveningSeedOverlay').classList.add('hidden');
        });
        safeBind('closeEveningSeed', 'click', function() {
            localStorage.setItem('lwp_evening_seed_' + new Date().toDateString(), 'done');
            document.getElementById('eveningSeedOverlay').classList.add('hidden');
        });

        // Wind Down Ritual modal
        safeBind('btnWindDownDone', 'click', function() {
            localStorage.setItem('lwp_wind_down_' + new Date().toDateString(), 'done');
            document.getElementById('windDownOverlay').classList.add('hidden');
        });
        safeBind('closeWindDown', 'click', function() {
            localStorage.setItem('lwp_wind_down_' + new Date().toDateString(), 'done');
            document.getElementById('windDownOverlay').classList.add('hidden');
        });

        // Wind Down timers
        document.querySelectorAll('.btn-wind-timer').forEach(function(btn) {
            btn.addEventListener('click', function() {
                startWindDownTimer(this);
            });
        });

        // Start evening scheduler
        startEveningScheduler();

        // Archive modal
        // Tomorrow's Plan button
        safeBind('btnTomorrow', 'click', function() {
            if (!requirePro('tomorrow')) return;
            try { showEveningSeedManual(); } catch(e) { console.error('tomorrow plan error:', e); }
        });

        safeBind('btnArchive', 'click', function() {
            if (!requirePro('archive')) return;
            renderArchive(currentArchivePeriod);
            document.getElementById('archiveOverlay').classList.remove('hidden');
        });
        safeBind('closeArchive', 'click', function() {
            document.getElementById('archiveOverlay').classList.add('hidden');
        });

        // Archive period tabs
        document.querySelectorAll('.archive-tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.archive-tab').forEach(function(t) { t.classList.remove('active'); });
                this.classList.add('active');
                renderArchive(this.dataset.period);
            });
        });

        // Unarchive button (delegated)
        safeBind('archiveList', 'click', function(e) {
            var btn = e.target.closest('.archive-unarchive-btn');
            if (btn) {
                var oid = btn.dataset.outcomeId;
                if (oid && confirm('Restore this outcome to your active list?')) {
                    unarchiveOutcome(oid);
                }
            }
        });

        // Filter tabs
        document.querySelectorAll('.filter-tabs .tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.filter-tabs .tab').forEach(function(t) { t.classList.remove('active'); });
                this.classList.add('active');
                currentFilter = this.dataset.filter;
                render();
            });
        });
    }

    // ==========================================
    //  SAVE USER PROFILE (email, name, photo)
    // ==========================================
    function saveUserProfile(user) {
        if (!firebaseReady || !user) return;
        try {
            var profileData = {
                email: user.email || '',
                displayName: user.displayName || '',
                photoURL: user.photoURL || '',
                lastLogin: new Date().toISOString()
            };
            // Only set createdAt on first login (don't overwrite)
            db.collection('users').doc(user.uid).get().then(function(doc) {
                if (!doc.exists || !doc.data().createdAt) {
                    profileData.createdAt = new Date().toISOString();
                }
                db.collection('users').doc(user.uid).set(profileData, { merge: true });
            }).catch(function(e) {
                // Fallback: just merge without checking createdAt
                db.collection('users').doc(user.uid).set(profileData, { merge: true });
            });
        } catch(e) { console.error('Save user profile error:', e); }
    }

    // ==========================================
    //  LAUNCH (Auth-aware)
    // ==========================================
    function onAuthReady(user) {
        currentUser = user;
        isOfflineMode = false;
        // Set user-specific storage key BEFORE loading any data
        activeStorageKey = getStorageKey(user.uid);
        updateUserUI(user);
        showApp();

        // Save user profile (email, name, photo) to Firestore for contact/emailing
        saveUserProfile(user);

        // Load tier from Firestore
        loadUserTier(user.uid);

        // Founding member system
        registerFoundingMember(user.uid);

        // Check engagement after founding member status loads
        setTimeout(function() {
            checkFoundingMemberEngagement();
        }, 3000);

        // Referral system
        saveReferralCode(user.uid);
        trackReferral();

        // Try to load from Firestore first, fall back to localStorage
        loadFromFirestore(async function(remoteData) {
            await loadDataEncrypted(); // load local (encrypted, user-specific key)

            if (remoteData) {
                var localLogLen = (data && data.log) ? data.log.length : 0;
                var remoteLogLen = remoteData.log ? remoteData.log.length : 0;
                var localOutcomeLen = (data && data.outcomes) ? data.outcomes.length : 0;
                var remoteOutcomeLen = remoteData.outcomes ? remoteData.outcomes.length : 0;

                if (remoteLogLen > localLogLen || remoteOutcomeLen > localOutcomeLen) {
                    data = remoteData;
                    ensureDataFields();
                    applyDataMigrations();
                    await saveDataEncrypted();
                } else if (localLogLen > remoteLogLen || localOutcomeLen > remoteOutcomeLen) {
                    saveToFirestore();
                }
            } else if (data && data.outcomes && data.outcomes.length > 0) {
                saveToFirestore();
            }

            // Check for offline/demo data migration
            try { checkOfflineDataMigration(user.uid); } catch(e) { console.error('offline migration error:', e); }

            init();
            listenToFirestore();
            updateUpgradeButtonVisibility();
        });
    }

    // ── Founding Member System ───────────────────────────────────
    var foundingMemberCount = 0;
    var isFoundingMember = false;
    var isTrialUser = false;
    var FOUNDING_MEMBER_LIMIT = 100;
    var TRIAL_DURATION_DAYS = 14;

    function loadFoundingMemberCount(callback) {
        if (!firebaseReady) { if (callback) callback(); return; }
        try {
            db.collection('meta').doc('founding_members').get().then(function(doc) {
                if (doc.exists) {
                    foundingMemberCount = doc.data().count || 0;
                } else {
                    foundingMemberCount = 0;
                }
                if (callback) callback();
            }).catch(function() { if (callback) callback(); });
        } catch(e) { if (callback) callback(); }
    }

    function registerFoundingMember(uid) {
        if (!firebaseReady) return;
        db.collection('users').doc(uid).get().then(function(doc) {
            var userData = doc.exists ? doc.data() : {};

            // Already a founding member
            if (userData.foundingMember) {
                // Check if revoked
                if (userData.foundingMemberStatus === 'revoked') {
                    isFoundingMember = false;
                    isTrialUser = true;
                    showFoundingMemberRevokedNotice();
                    return;
                }
                isFoundingMember = true;
                userTier = 'founding';
                updateFoundingMemberUI();
                // Check if promoted from waitlist — show congrats
                if (userData.foundingMemberPromotedFromWaitlist) {
                    if (!localStorage.getItem('lwp_waitlist_congrats_' + uid)) {
                        localStorage.setItem('lwp_waitlist_congrats_' + uid, '1');
                        setTimeout(function() { showWaitlistPromotionCongrats(); }, 1500);
                    }
                }
                return;
            }

            // Already a trial user
            if (userData.trialUser) {
                isTrialUser = true;
                checkTrialExpiry(userData);
                return;
            }

            // Check if spots available — refresh count from Firestore first to avoid race condition
            db.collection('meta').doc('founding_members').get().then(function(metaDoc) {
                if (metaDoc.exists && metaDoc.data().count) {
                    foundingMemberCount = metaDoc.data().count;
                }
                if (foundingMemberCount >= FOUNDING_MEMBER_LIMIT) {
                    registerTrialUser(uid);
                    return;
                }
                // Register as founding member
                db.collection('users').doc(uid).set({
                    foundingMember: true,
                    foundingMemberDate: new Date().toISOString(),
                    foundingMemberStatus: 'active',
                    lastActiveDate: new Date().toISOString(),
                    feedbackStreak: 0
                }, { merge: true });
                db.collection('meta').doc('founding_members').set({
                    count: firebase.firestore.FieldValue.increment(1)
                }, { merge: true });
                isFoundingMember = true;
                foundingMemberCount++;
                updateFoundingMemberUI();
            }).catch(function(e) { console.error('Founding member count check error:', e); });
        }).catch(function(e) { console.error('Founding member error:', e); });
    }

    function registerTrialUser(uid) {
        var trialEnd = new Date();
        trialEnd.setDate(trialEnd.getDate() + TRIAL_DURATION_DAYS);

        db.collection('users').doc(uid).set({
            trialUser: true,
            trialStartDate: new Date().toISOString(),
            trialEndDate: trialEnd.toISOString(),
            foundingMember: false
        }, { merge: true });

        // Add to waitlist
        var email = currentUser ? currentUser.email : '';
        if (email) {
            var safeKey = email.replace(/[.#$/\[\]]/g, '_');
            db.collection('waitlist').doc(safeKey).set({
                email: email,
                displayName: currentUser.displayName || '',
                uid: uid,
                joinDate: new Date().toISOString(),
                notified: false,
                convertedToFounder: false
            }, { merge: true });
        }

        isTrialUser = true;
        showTrialWelcomeModal();
    }

    function checkTrialExpiry(userData) {
        if (!userData.trialEndDate) return;
        var endDate = new Date(userData.trialEndDate);
        var now = new Date();
        var daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));

        if (daysLeft <= 0) {
            showTrialExpiredModal();
        } else if (daysLeft <= 3) {
            showTrialExpiringWarning(daysLeft);
        }
    }

    function showTrialWelcomeModal() {
        var overlay = document.getElementById('trialWelcomeOverlay');
        if (overlay) {
            var emailEl = document.getElementById('trialUserEmail');
            if (emailEl && currentUser) emailEl.textContent = currentUser.email;
            overlay.classList.remove('hidden');
        }
    }

    function showTrialExpiredModal() {
        var overlay = document.getElementById('trialExpiredOverlay');
        if (overlay) overlay.classList.remove('hidden');
    }

    function showTrialExpiringWarning(daysLeft) {
        var toast = document.getElementById('challengeToast');
        var toastText = document.getElementById('challengeToastText');
        if (toast && toastText) {
            toastText.textContent = '\u23F3 Your free trial ends in ' + daysLeft + ' day' + (daysLeft !== 1 ? 's' : '') + '. A founding spot may open up!';
            toast.classList.remove('hidden');
            setTimeout(function() { toast.classList.add('hidden'); }, 7000);
        }
    }

    // ── Founding Member Engagement Tracking ──────────────────────
    function checkFoundingMemberEngagement() {
        if (!firebaseReady || !currentUser || !isFoundingMember) return;

        db.collection('users').doc(currentUser.uid).get().then(function(doc) {
            if (!doc.exists || !doc.data().foundingMember) return;
            var userData = doc.data();
            var now = new Date();

            // Check 1: Inactivity (14 days no login = revoke)
            var lastActive = userData.lastActiveDate ? new Date(userData.lastActiveDate) : new Date();
            var daysSinceActive = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));

            if (daysSinceActive >= 14) {
                revokeFoundingMemberStatus(currentUser.uid, 'inactivity');
                return;
            } else if (daysSinceActive >= 7 && userData.foundingMemberStatus !== 'warned') {
                showInactivityNudge(daysSinceActive);
                db.collection('users').doc(currentUser.uid).set({
                    foundingMemberStatus: 'warned'
                }, { merge: true });
            }

            // Check 2: Feedback gap (3 days no daily feedback = warning, then revoke)
            var lastFeedback = userData.lastFeedbackDate ? new Date(userData.lastFeedbackDate) : null;
            if (lastFeedback) {
                var daysSinceFeedback = Math.floor((now - lastFeedback) / (1000 * 60 * 60 * 24));
                if (daysSinceFeedback >= 4 && userData.feedbackWarned) {
                    // Already warned, still no feedback — revoke
                    revokeFoundingMemberStatus(currentUser.uid, 'no_feedback');
                    return;
                } else if (daysSinceFeedback >= 3 && !userData.feedbackWarned) {
                    // First warning at 3 days
                    showFeedbackWarningModal(daysSinceFeedback);
                    db.collection('users').doc(currentUser.uid).set({
                        feedbackWarned: true
                    }, { merge: true });
                }
            }
        }).catch(function(e) { console.error('Engagement check error:', e); });
    }

    function revokeFoundingMemberStatus(uid, reason) {
        isFoundingMember = false;
        userTier = 'free';
        db.collection('users').doc(uid).set({
            foundingMember: false,
            foundingMemberStatus: 'revoked',
            foundingMemberRevokedDate: new Date().toISOString(),
            foundingMemberRevokedReason: reason || 'unknown',
            feedbackWarned: false,
            // Start 14-day trial for revoked member
            trialUser: true,
            trialEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
        }, { merge: true });

        // Decrement founding member count to open spot
        db.collection('meta').doc('founding_members').set({
            count: firebase.firestore.FieldValue.increment(-1)
        }, { merge: true });
        foundingMemberCount = Math.max(0, foundingMemberCount - 1);

        // Notify owner that a spot opened
        db.collection('feedback_notifications').add({
            type: 'spot_opened',
            reason: reason,
            revokedUserUid: uid,
            revokedUserEmail: currentUser ? currentUser.email : '',
            date: new Date().toISOString(),
            ownerEmail: 'ereana.swan@gmail.com'
        }).catch(function(e) { console.error('Notification error:', e); });

        // Auto-promote next person on waitlist
        promoteNextWaitlistMember();

        if (reason === 'no_feedback') {
            showFeedbackRevokedNotice();
        } else {
            showFoundingMemberRevokedNotice();
        }
    }

    function showInactivityNudge(days) {
        var overlay = document.getElementById('nudgeOverlay');
        if (!overlay) return;
        var daysEl = document.getElementById('nudgeDaysCount');
        if (daysEl) daysEl.textContent = days;
        overlay.classList.remove('hidden');
    }

    function showFoundingMemberRevokedNotice() {
        var overlay = document.getElementById('revokedOverlay');
        if (overlay) overlay.classList.remove('hidden');
    }

    function showFeedbackWarningModal(daysMissed) {
        var overlay = document.getElementById('feedbackWarningOverlay');
        if (!overlay) return;
        var daysEl = document.getElementById('feedbackWarningDays');
        if (daysEl) daysEl.textContent = daysMissed;
        overlay.classList.remove('hidden');
    }

    function showFeedbackRevokedNotice() {
        var overlay = document.getElementById('feedbackRevokedOverlay');
        if (overlay) overlay.classList.remove('hidden');
    }

    // ── Waitlist Auto-Promotion ──────────────────────────────────
    function promoteNextWaitlistMember() {
        if (!firebaseReady) return;
        db.collection('waitlist').orderBy('joinDate', 'asc').limit(1).get()
            .then(function(snapshot) {
                if (snapshot.empty) return; // No one on waitlist
                var waitlistDoc = snapshot.docs[0];
                var waitlistData = waitlistDoc.data();
                var promotedUid = waitlistData.uid;

                if (!promotedUid) return; // No uid stored, can't auto-promote

                // Promote: set as founding member
                db.collection('users').doc(promotedUid).set({
                    foundingMember: true,
                    foundingMemberStatus: 'active',
                    foundingMemberJoinDate: new Date().toISOString(),
                    foundingMemberPromotedFromWaitlist: true,
                    trialUser: false,
                    feedbackStreak: 0,
                    feedbackWarned: false,
                    lastActiveDate: new Date().toISOString()
                }, { merge: true });

                // Increment founding member count
                db.collection('meta').doc('founding_members').set({
                    count: firebase.firestore.FieldValue.increment(1)
                }, { merge: true });

                // Remove from waitlist
                waitlistDoc.ref.delete();

                // Notify owner about promotion
                db.collection('feedback_notifications').add({
                    type: 'waitlist_promoted',
                    promotedUid: promotedUid,
                    promotedEmail: waitlistData.email || '',
                    promotedName: waitlistData.displayName || '',
                    date: new Date().toISOString(),
                    ownerEmail: 'ereana.swan@gmail.com'
                }).catch(function(e) { console.error('Promotion notification error:', e); });
            })
            .catch(function(e) { console.error('Waitlist promotion error:', e); });
    }

    function showWaitlistPromotionCongrats() {
        var overlay = document.getElementById('waitlistCongratsOverlay');
        if (overlay) overlay.classList.remove('hidden');
    }

    function updateFoundingMemberUI() {
        if (!isFoundingMember) return;
        var badge = document.getElementById('betaBadge');
        if (badge) {
            badge.innerHTML = '&#127775; Founding Member';
            badge.classList.add('founding-member-badge');
        }
    }

    // ── Referral System ───────────────────────────────────────
    var REFERRAL_REWARD_THRESHOLD = 3; // Refer 3 people = 1 free month

    function getReferralCode() {
        if (!currentUser) return '';
        // Short referral code from UID
        return currentUser.uid.substring(0, 8);
    }

    function getReferralLink() {
        return 'https://myhabitmagic.com?ref=' + getReferralCode();
    }

    function loadReferralCount(uid, callback) {
        if (!firebaseReady) { if (callback) callback(0); return; }
        db.collection('users').doc(uid).get().then(function(doc) {
            var count = (doc.exists && doc.data().referralCount) ? doc.data().referralCount : 0;
            if (callback) callback(count);
        }).catch(function() { if (callback) callback(0); });
    }

    function trackReferral() {
        // Check URL for ?ref= param and store it
        var params = new URLSearchParams(window.location.search);
        var refCode = params.get('ref');
        if (refCode && currentUser) {
            // Don't self-refer
            if (refCode === getReferralCode()) return;
            // Check if already tracked
            db.collection('users').doc(currentUser.uid).get().then(function(doc) {
                if (doc.exists && doc.data().referredBy) return; // already tracked
                // Mark this user as referred
                db.collection('users').doc(currentUser.uid).set({
                    referredBy: refCode,
                    referredDate: new Date().toISOString()
                }, { merge: true });
                // Increment the referrer's count
                // Find user by referral code (first 8 chars of UID)
                db.collection('users').where('referralCode', '==', refCode).get().then(function(snap) {
                    if (!snap.empty) {
                        var referrerDoc = snap.docs[0];
                        db.collection('users').doc(referrerDoc.id).set({
                            referralCount: firebase.firestore.FieldValue.increment(1)
                        }, { merge: true });
                    }
                });
            });
            // Clean URL
            window.history.replaceState({}, '', window.location.pathname);
        }
    }

    function saveReferralCode(uid) {
        if (!firebaseReady) return;
        var code = uid.substring(0, 8);
        db.collection('users').doc(uid).set({
            referralCode: code
        }, { merge: true });
    }

    // ── Review & Feedback Triggers ───────────────────────────────
    var REVIEW_MILESTONES = [10, 25, 50, 100]; // action counts that trigger review ask
    var STREAK_REVIEW_MILESTONE = 7; // 7-day streak triggers review

    function checkReviewTrigger() {
        if (!data || !currentUser || isOfflineMode) return;
        var logLen = data.log.length;
        var alreadyAsked = localStorage.getItem('lwp_review_asked_' + logLen);
        if (alreadyAsked) return;

        var shouldAsk = false;
        var message = '';

        // Check action milestones
        if (REVIEW_MILESTONES.indexOf(logLen) !== -1) {
            shouldAsk = true;
            message = 'You\'ve crushed ' + logLen + ' actions! 🎉 Your feedback helps other ADHD brains find us.';
        }
        // Check streak milestone
        if (data.streak === STREAK_REVIEW_MILESTONE && !localStorage.getItem('lwp_review_streak7')) {
            shouldAsk = true;
            message = '7 days strong! 🔥 Your review helps others with ADHD discover us.';
            localStorage.setItem('lwp_review_streak7', '1');
        }

        if (shouldAsk) {
            localStorage.setItem('lwp_review_asked_' + logLen, '1');
            setTimeout(function() {
                showReviewModal(message);
            }, 2000);
        }
    }

    function showReviewModal(message) {
        var refLink = getReferralLink();
        var overlay = document.createElement('div');
        overlay.className = 'modal-overlay review-modal-overlay';
        overlay.innerHTML = '<div class="modal review-modal">' +
            '<button class="modal-close review-close">&times;</button>' +
            '<div class="review-icon">&#11088;</div>' +
            '<h2>You\'re Crushing It!</h2>' +
            '<p class="review-message">' + message + '</p>' +
            '<div class="review-actions">' +
                '<button class="btn-primary review-btn" id="btnShareReview">&#11088; Share Feedback</button>' +
                '<button class="btn-secondary review-btn" id="btnShareReferral">&#128279; Share With a Friend</button>' +
            '</div>' +
            '<div class="referral-link-box">' +
                '<p class="referral-label">Your referral link (refer 3 friends = free month):</p>' +
                '<input type="text" class="input-field referral-input" value="' + refLink + '" readonly id="referralLinkInput">' +
                '<button class="btn-secondary btn-copy-link" id="btnCopyReferral">Copy Link</button>' +
            '</div>' +
            '<button class="btn-secondary review-skip">Maybe later</button>' +
        '</div>';
        document.body.appendChild(overlay);

        overlay.querySelector('.review-close').onclick = function() { overlay.remove(); };
        overlay.querySelector('.review-skip').onclick = function() { overlay.remove(); };
        overlay.querySelector('#btnShareReview').onclick = function() {
            // Open feedback form or email
            window.open('mailto:hello@myhabitmagic.com?subject=Habit Magic Feedback&body=What worked:%0A%0AWhat didn\'t:%0A%0ASuggestions:%0A', '_blank');
        };
        overlay.querySelector('#btnShareReferral').onclick = function() {
            if (navigator.share) {
                navigator.share({ title: 'Habit Magic', text: 'This productivity app actually works with my ADHD brain. Try it free!', url: refLink });
            } else {
                document.getElementById('referralLinkInput').select();
                document.execCommand('copy');
                alert('Link copied!');
            }
        };
        overlay.querySelector('#btnCopyReferral').onclick = function() {
            var input = document.getElementById('referralLinkInput');
            input.select();
            document.execCommand('copy');
            this.textContent = 'Copied!';
            setTimeout(function() { document.querySelector('.btn-copy-link').textContent = 'Copy Link'; }, 2000);
        };
    }

    function loadUserTier(uid) {
        if (!firebaseReady) return;
        try {
            db.collection('users').doc(uid).get().then(function(doc) {
                if (doc.exists) {
                    var userData = doc.data();
                    if (userData.foundingMember) {
                        userTier = 'founding';
                    } else if (userData.tier) {
                        userTier = userData.tier; // 'free', 'starter', or 'pro'
                    } else if (currentUser && currentUser.email === 'irishka.lebedeva@gmail.com') {
                        userTier = 'pro';
                        db.collection('users').doc(uid).set({ tier: 'pro' }, { merge: true });
                    } else {
                        userTier = 'free';
                    }
                } else {
                    userTier = 'free';
                }
                updateUpgradeButtonVisibility();
                updateModeLocksUI();
            }).catch(function() {
                userTier = 'free';
                updateUpgradeButtonVisibility();
            });
        } catch(e) {
            userTier = 'free';
        }
    }

    // Safe event binding helper — prevents null crashes
    function safeBind(id, event, handler) {
        var el = document.getElementById(id);
        if (el) el.addEventListener(event, handler);
        else console.warn('safeBind: #' + id + ' not found');
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Preload celebration sounds
        preloadCelebrationSounds();

        // Auth button handlers
        safeBind('btnGoogleLogin', 'click', googleLogin);
        // Additional landing page login buttons
        var btnNav = document.getElementById('btnGoogleLoginNav');
        if (btnNav) btnNav.addEventListener('click', googleLogin);
        var btnBottom = document.getElementById('btnGoogleLoginBottom');
        if (btnBottom) btnBottom.addEventListener('click', googleLogin);

        safeBind('btnOfflineMode', 'click', function(e) {
            e.preventDefault();
            startOfflineMode();
        });
        // Landing page billing toggle (must bind here, pre-login)
        safeBind('landingBillingToggle', 'change', function() {
            var isAnnual = this.checked;
            var sp = document.getElementById('landingStarterPrice');
            var sper = document.getElementById('landingStarterPeriod');
            var sdesc = document.getElementById('landingStarterDesc');
            var seff = document.getElementById('landingStarterEffective');
            var pp = document.getElementById('landingProPrice');
            var pper = document.getElementById('landingProPeriod');
            var pdesc = document.getElementById('landingProDesc');
            var peff = document.getElementById('landingProEffective');
            if (isAnnual) {
                if (sp) sp.textContent = '$8.25';
                if (sper) sper.textContent = '/mo';
                if (sdesc) sdesc.innerHTML = 'Billed $99/year <strong>(save $21)</strong>';
                if (seff) seff.textContent = 'Less than 2 coffees a week';
                if (pp) pp.textContent = '$14.92';
                if (pper) pper.textContent = '/mo';
                if (pdesc) pdesc.innerHTML = 'Billed $179/year <strong>(save $61)</strong>';
                if (peff) peff.textContent = 'Less than 1 therapy session';
            } else {
                if (sp) sp.textContent = '$9.99';
                if (sper) sper.textContent = '/mo';
                if (sdesc) sdesc.innerHTML = 'or $99/year <strong>(save $21)</strong>';
                if (seff) seff.innerHTML = 'That\u2019s $8.25/mo \u2014 less than 2 coffees';
                if (pp) pp.textContent = '$19.99';
                if (pper) pper.textContent = '/mo';
                if (pdesc) pdesc.innerHTML = 'or $179/year <strong>(save $61)</strong>';
                if (peff) peff.innerHTML = '$14.92/mo \u2014 less than 1 therapy session';
            }
            var ml = document.getElementById('landingBillingMonthlyLabel');
            var al = document.getElementById('landingBillingAnnualLabel');
            if (ml) ml.classList.toggle('active', !isAnnual);
            if (al) al.classList.toggle('active', isAnnual);
        });

        // Menu toggle (mobile dropdown)
        var menuToggle = document.getElementById('btnMenuToggle');
        var menuDropdown = document.getElementById('topActionsDropdown');
        var userAvatar = document.getElementById('userAvatar');
        if (menuToggle && menuDropdown) {
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                menuDropdown.classList.toggle('hidden');
            });
            // Avatar opens its own small dropdown (Sign Out only)
            var avatarDropdown = document.getElementById('avatarDropdown');
            if (userAvatar && avatarDropdown) {
                userAvatar.addEventListener('click', function(e) {
                    e.stopPropagation();
                    menuDropdown.classList.add('hidden');
                    avatarDropdown.classList.toggle('hidden');
                });
                var btnAvatarLogout = document.getElementById('btnAvatarLogout');
                if (btnAvatarLogout) {
                    btnAvatarLogout.addEventListener('click', function() {
                        avatarDropdown.classList.add('hidden');
                        logout();
                    });
                }
            }
            // Close dropdown when clicking a menu item
            menuDropdown.querySelectorAll('.dropdown-item').forEach(function(item) {
                item.addEventListener('click', function() {
                    menuDropdown.classList.add('hidden');
                });
            });
            // Close dropdowns when clicking outside
            document.addEventListener('click', function(e) {
                if (!menuToggle.contains(e.target) && !menuDropdown.contains(e.target)) {
                    menuDropdown.classList.add('hidden');
                }
                var avDd = document.getElementById('avatarDropdown');
                if (avDd && userAvatar && !userAvatar.contains(e.target) && !avDd.contains(e.target)) {
                    avDd.classList.add('hidden');
                }
            });
        }

        // Demo banner buttons
        var btnDemoSignIn = document.getElementById('btnDemoSignIn');
        if (btnDemoSignIn) {
            btnDemoSignIn.addEventListener('click', function() {
                googleLogin();
            });
        }
        var btnDemoDownload = document.getElementById('btnDemoDownload');
        if (btnDemoDownload) {
            btnDemoDownload.addEventListener('click', function() {
                exportDemoData();
            });
        }

        // Upgrade button
        var btnUpgrade = document.getElementById('btnUpgrade');
        if (btnUpgrade) {
            btnUpgrade.addEventListener('click', function() {
                showUpgradeModal();
            });
        }

        // Mode toggle (Personal / Health / Business / Finances)
        document.querySelectorAll('.mode-toggle-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var mode = this.getAttribute('data-mode');
                if (mode && currentMode !== mode) switchMode(mode);
            });
        });

        // Mobile mode dropdown
        var modeSelectMobile = document.getElementById('modeSelectMobile');
        if (modeSelectMobile) {
            modeSelectMobile.addEventListener('change', function() {
                var mode = this.value;
                if (mode && currentMode !== mode) {
                    if (!canAccessMode(mode)) {
                        this.value = currentMode; // Reset dropdown
                        showPricingModal(mode);
                        return;
                    }
                    switchMode(mode);
                }
            });
        }

        // Help button in top bar
        var btnHelpTopbar = document.getElementById('btnHelpTopbar');
        if (btnHelpTopbar) {
            btnHelpTopbar.addEventListener('click', function() {
                document.getElementById('helpOverlay').classList.remove('hidden');
            });
        }

        // "What is not working?" bug report button
        safeBind('btnFeedback', 'click', function() {
            document.getElementById('bugReportOverlay').classList.remove('hidden');
            // Reset form
            document.querySelectorAll('.bug-section-cb').forEach(function(cb) { cb.checked = false; });
            document.querySelectorAll('#bugReportForm textarea').forEach(function(ta) { ta.value = ''; });
            var thanks = document.getElementById('bugReportThanks');
            if (thanks) thanks.classList.add('hidden');
        });
        // Submit bug report to Firestore
        safeBind('btnSubmitBugReport', 'click', function() {
            // Collect checked issues per section
            var issues = [];
            document.querySelectorAll('.bug-section-cb:checked').forEach(function(cb) {
                issues.push(cb.value);
            });
            // Collect per-section text
            var sectionNotes = {};
            document.querySelectorAll('#bugReportForm textarea[data-bug-section]').forEach(function(ta) {
                var val = ta.value.trim();
                if (val) sectionNotes[ta.dataset.bugSection] = val;
            });
            var otherText = (document.getElementById('bugReportOther') || {}).value || '';
            otherText = otherText.trim();

            // Require at least one checkbox or one text entry
            if (issues.length === 0 && Object.keys(sectionNotes).length === 0 && !otherText) {
                var firstTA = document.querySelector('#bugReportForm textarea');
                if (firstTA) firstTA.classList.add('input-error');
                return;
            }

            var feedbackData = {
                type: 'bug_report',
                issues: issues,
                sectionNotes: sectionNotes,
                other: otherText,
                userId: currentUser ? currentUser.uid : 'anonymous',
                userEmail: currentUser ? currentUser.email : null,
                page: window.location.pathname,
                userAgent: navigator.userAgent,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            db.collection('bugs_and_feedback').add(feedbackData).then(function() {
                var thanks = document.getElementById('bugReportThanks');
                if (thanks) thanks.classList.remove('hidden');
                setTimeout(function() {
                    document.getElementById('bugReportOverlay').classList.add('hidden');
                }, 1500);
            }).catch(function(err) {
                console.error('Bug report save error:', err);
                alert('Could not save report. Please try again.');
            });
        });

        // Bad Day Mode button (from Welcome Back overlay)
        safeBind('btnBadDayMode', 'click', function() {
            document.getElementById('welcomeBackOverlay').classList.add('hidden');
            resetBadDayTasks();
            document.getElementById('badDayOverlay').classList.remove('hidden');
        });

        // Body Double button
        safeBind('btnBodyDoubleStart', 'click', function() {
            document.getElementById('bodyDoubleOverlay').classList.remove('hidden');
        });
        safeBind('btnStartBodyDouble', 'click', function() {
            startBodyDouble();
        });

        safeBind('btnRepeatBodyDouble', 'click', function() {
            var repeatBtn = document.getElementById('btnRepeatBodyDouble');
            if (repeatBtn) repeatBtn.classList.add('hidden');
            startBodyDouble();
        });

        // Body Double sound selection buttons
        document.querySelectorAll('.bd-sound-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.bd-sound-btn').forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                // If session is running, switch sound live
                if (bodyDoubleInterval) {
                    playAmbientSound(this.dataset.sound);
                }
            });
        });

        // Theme toggle (light/dark)
        initTheme();
        safeBind('btnTheme', 'click', toggleTheme);

        // Referral modal
        safeBind('btnRefer', 'click', function() {
            loadFoundingMemberCount(function() {
                var remaining = Math.max(0, FOUNDING_MEMBER_LIMIT - foundingMemberCount);
                document.querySelectorAll('.founding-spots-count').forEach(function(el) { el.textContent = remaining; });
            });
            // Update referral link with user's actual referral code
            var refInput = document.getElementById('referralLinkInput');
            if (refInput) refInput.value = getReferralLink();
            var overlay = document.getElementById('referralOverlay');
            if (overlay) overlay.classList.remove('hidden');
            var dd = document.getElementById('topActionsDropdown');
            if (dd) dd.classList.add('hidden');
        });
        safeBind('btnCopyReferral', 'click', function() {
            var input = document.getElementById('referralLinkInput');
            if (!input) return;
            input.select();
            try {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(input.value);
                } else {
                    document.execCommand('copy');
                }
            } catch(e) { document.execCommand('copy'); }
            var msg = document.getElementById('referralCopiedMsg');
            if (msg) {
                msg.classList.remove('hidden');
                setTimeout(function() { msg.classList.add('hidden'); }, 3000);
            }
        });
        safeBind('btnShareWhatsApp', 'click', function() {
            var link = getReferralLink();
            window.open('https://wa.me/?text=' + encodeURIComponent('I\u2019ve been using Habit Magic \u2014 a gamified habit tracker built for ADHD brains. Founding member spots are limited! ' + link), '_blank');
        });
        safeBind('btnShareTwitter', 'click', function() {
            var link = getReferralLink();
            window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('I\u2019ve been using Habit Magic \u2014 a gamified habit tracker built for ADHD brains. Founding member spots are limited! ' + link), '_blank');
        });
        safeBind('btnShareEmail', 'click', function() {
            var link = getReferralLink();
            window.location.href = 'mailto:?subject=' + encodeURIComponent('Check out Habit Magic') + '&body=' + encodeURIComponent('Hey! I\u2019ve been using Habit Magic \u2014 a gamified habit tracker built for ADHD brains. It\u2019s really helping me stay on track. Founding member spots are limited \u2014 check it out: ' + link);
        });

        if (firebaseReady) {
            // Handle redirect result (for when popup was blocked)
            handleRedirectResult();

            // Listen for auth state
            auth.onAuthStateChanged(function(user) {
                if (user) {
                    onAuthReady(user);
                } else {
                    showLoginScreen();
                }
            });
        } else {
            // No Firebase config — go straight to offline mode
            startOfflineMode();
        }
    });
})();
