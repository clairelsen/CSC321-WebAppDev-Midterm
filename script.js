/*
* Created by: Claire Elsen
*
* Collaborators: Generative AI (Gemini) for a basic structure
*/

// Initial Mock Data
const initialUserData = {
    heroName: "Hero",
    level: 1,
    xp: 0,
    xpToLevel: 100,
    gold: 50,
    longestStreak: 5,
    bossHp: 100,
    avatarIcon: "🧑‍💻",
    avatarColor: "#007bff"
};

let initialHabits = [
    { id: 1, name: "Read 30 minutes", difficulty: "medium", isDaily: true, completedToday: false, streak: 5 },
    { id: 2, name: "Morning Jog", difficulty: "hard", isDaily: true, completedToday: false, streak: 12 },
    { id: 3, name: "Track Daily Spending", difficulty: "easy", isDaily: true, completedToday: true, streak: 3 },
    { id: 4, name: "Finish CSC321 Project", difficulty: "hard", isDaily: false, completedToday: false, streak: 0 }
];

let initialJournalEntries = [
    { id: 1, date: '2025-10-30', text: 'Managed to complete all hard quests today. The momentum is building! Feeling ready for a Level Up soon.'},
    { id: 2, date: '2025-10-29', text: 'Struggled with the "Procrastination Dragon" today. Spent an hour on social media, need to do better tomorrow.'}
];

// Core Components

// 1. Header Component (Displays Stats)
const Header = ({ userData }) => (
    <header className="bg-dark text-white p-3 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-0">⚔️ HabitQuest - Demo - By: Claire Elsen, 789558</h1>
            <div id="user-stats" className="d-flex align-items-center">
                <span className="me-3">Level: <strong>{userData.level}</strong></span>
                <span className="me-3">XP: <strong>{userData.xp}</strong> / <strong>{userData.xpToLevel}</strong></span>
                <span className="me-0">💰 Gold: <strong>{userData.gold}</strong></span>
            </div>
        </div>
    </header>
);

// 2. Avatar/Hero Card Component
const HeroCard = ({ userData, setuserData, handleCustomization }) => {
    return (
        <div className="card h-100 shadow-sm">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">My Hero: <span id="hero-name-display">{userData.heroName}</span></h5>
            </div>
            <div className="card-body text-center">
                <div id="avatar-image" className="avatar-box mb-3" style={{ backgroundColor: userData.avatarColor }}>
                    <span id="avatar-icon">{userData.avatarIcon}</span>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">Current Streak: <span id="longest-streak">{userData.longestStreak}</span> days 🔥</h6>

                <button className="btn btn-sm btn-purple w-100 mb-2" data-bs-toggle="modal" data-bs-target="#customizeModal">
                    🎨 Customize Hero
                </button>
                <button className="btn btn-sm btn-outline-success w-100 mb-2" data-bs-toggle="modal" data-bs-target="#shopModal">
                    🛍️ Visit the Virtual Shop
                </button>
                {/* Customization Modal is defined at the App level */}
            </div>
        </div>
    );
};


// 3. Quest Item Component
const QuestItem = ({ habit, logHabit, deleteHabit }) => {
    const rewards = { easy: '+10 XP / +5 Gold', medium: '+25 XP / +15 Gold', hard: '+50 XP / +30 Gold' };

    return (
        <div id={`habit-item-${habit.id}`}
             className={`list-group-item habit-item d-flex justify-content-between align-items-center ${habit.completedToday ? 'completed' : ''}`}
        >
            <div>
                <h6 className="mb-1">{habit.name}</h6>
                <p className="mb-1 small text-muted">
                    <span className="badge bg-secondary">{habit.difficulty.toUpperCase()}</span>
                    • {habit.isDaily ? `Daily Quest (${rewards[habit.difficulty]})` : 'To-Do'}
                    {habit.isDaily && ` • Streak: `}
                    {habit.isDaily && <strong className="text-success">{habit.streak} 🔥</strong>}
                </p>
            </div>
            <div className='d-flex align-items-center'>
                <button
                    className={`task-complete-btn me-2 ${habit.completedToday ? 'completed' : ''}`}
                    onClick={() => logHabit(habit.id)}
                    disabled={habit.completedToday}
                >
                    {habit.completedToday ? '✅' : '⚪'}
                </button>
                <button
                    className="btn btn-sm btn-outline-danger ms-1"
                    onClick={() => deleteHabit(habit.id)}
                >
                    ✖
                </button>
            </div>
        </div>
    );
};

// 4. Quest List Component (Iterates and Renders Items)
const QuestList = ({ habits, logHabit, deleteHabit }) => (
    <div id="habit-list" className="list-group list-group-flush">
        {habits.map(habit => (
            <QuestItem key={habit.id} habit={habit} logHabit={logHabit} deleteHabit={deleteHabit} />
        ))}
    </div>
);


// 5. Journal Reflection Item Component
const ReflectionEntry = ({ entry, deleteReflection }) => {
    return (
        <div className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
            <div>
                <h6 className="mb-1 text-primary">{entry.date}</h6>
                <p className="mb-0 small">{entry.text}</p>
            </div>
            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteReflection(entry.id)}>Delete</button>
        </div>
    );
};


// 6. Journal Modal Component
const JournalModal = ({ journalEntries, saveReflection, deleteReflection }) => {
    const [reflectionText, setReflectionText] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        saveReflection(reflectionText);
        setReflectionText('');
    };

    return (
        <div className="modal fade" id="journalModal" tabIndex="-1" aria-labelledby="journalModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    {/* ... (Modal Header) ... */}
                    <div className="modal-header bg-data text-white">
                        <h5 className="modal-title" id="journalModalLabel">📝 Reflection Log</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h6>Write a new Reflection:</h6>
                        <form onSubmit={handleSubmit} className="mb-4">
                            <div className="mb-3">
                                <label className="form-label small">What did you accomplish today? (Data & Self-Reflection 🔵)</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={reflectionText}
                                    onChange={(e) => setReflectionText(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-data btn-sm float-end">Save Reflection</button>
                        </form>

                        <h6 className="mt-5 pt-3 border-top">Past Reflections:</h6>
                        <div id="reflection-list" className="list-group">
                            {journalEntries.map(entry => (
                                <ReflectionEntry key={entry.id} entry={entry} deleteReflection={deleteReflection} />
                            ))}
                            {journalEntries.length === 0 && <div className="list-group-item text-muted">No reflections yet.</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 7. Shop Modal Component
const ShopModal = ({ userData, setUserData }) => {
    const handlePurchase = (item) => {
        if (item.cost > userData.gold) {
            alert(`Not enough gold! You need ${item.cost} Gold, but only have ${userData.gold}.`);
            return;
        }

        setUserData(prevData => {
            let newXP = prevData.xp + item.xpBonus;
            let newLevel = prevData.level;
            let newXPToLevel = prevData.xpToLevel;

            // Handle Level Up if XP exceeds threshold
            if (newXP >= newXPToLevel) {
                newLevel++;
                newXP -= newXPToLevel;
                newXPToLevel *= 2;
                alert(`*** LEVEL UP! *** You reached Level ${newLevel} by boosting your XP!`);
            }


            // Handle color purchase for premium item
            let newAvatarColor = prevData.avatarColor;
            if (item.id === 2) {
                newAvatarColor = '#FFD700'; // Set to Gold color from CSS
                alert(`Premium Armor Polish applied! Your avatar is now a regal gold.`);
            }

            return {
                ...prevData,
                gold: prevData.gold - item.cost,
                xp: newXP,
                level: newLevel,
                xpToLevel: newXPToLevel,
                avatarColor: newAvatarColor
            };
        });

        if (item.id !== 2) {
            alert(`${item.name} purchased! +${item.xpBonus} XP Gained.`);
        }
    };

    const shopItems = [
        { id: 1, name: "XP Boost Scroll", description: "Instantly gain 100 XP!", cost: 50, xpBonus: 100, icon: "✨" },
        { id: 2, name: "Premium Armor Polish", description: "Change your avatar color to a regal gold hue.", cost: 100, xpBonus: 0, icon: "👑" }
    ];

    return (
        <div className="modal fade" id="shopModal" tabIndex="-1" aria-labelledby="shopModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-success text-white">
                        <h5 className="modal-title" id="shopModalLabel">🛍️ Virtual Shop</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p className="small text-muted mb-3">Welcome, Hero! Spend your hard-earned gold on useful items.</p>

                        {shopItems.map(item => (
                            <div key={item.id} className="card mb-3">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="mb-0">{item.icon} {item.name}</h6>
                                        <p className="mb-1 small text-muted">{item.description}</p>
                                        <strong className="text-success">💰 {item.cost} Gold</strong>
                                    </div>
                                    <button
                                        className="btn btn-sm btn-success"
                                        onClick={() => handlePurchase(item)}
                                        disabled={userData.gold < item.cost}
                                    >
                                        Buy
                                    </button>
                                </div>
                            </div>
                        ))}
                        <p className='mt-4 text-end small'>Your Current Gold: <strong>{userData.gold}</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 8. Analytics Modal Component (NEW)
const AnalyticsModal = ({ habits, userData }) => {
    // Mock calculations based on current habit data
    const totalHabits = habits.length;
    const completedToday = habits.filter(h => h.completedToday).length;
    const completedRatio = totalHabits > 0 ? ((completedToday / totalHabits) * 100).toFixed(0) : 0;
    const longestStreak = userData.longestStreak;
    const hardQuests = habits.filter(h => h.difficulty === 'hard').length;

    return (
        <div className="modal fade" id="analyticsModal" tabIndex="-1" aria-labelledby="analyticsModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-data text-white">
                        <h5 className="modal-title" id="analyticsModalLabel">📊 Hero Analytics & Reports</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h4 className="text-data mb-3">Today's Performance</h4>
                        <div className="row text-center mb-4">
                            <div className="col-4">
                                <div className="card card-body bg-light">
                                    <h1 className="display-4 mb-1 text-data">{completedToday}/{totalHabits}</h1>
                                    <p className="small text-muted mb-0">Quests Completed</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="card card-body bg-light">
                                    <h1 className="display-4 mb-1 text-data">{completedRatio}%</h1>
                                    <p className="small text-muted mb-0">Completion Rate</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="card card-body bg-light">
                                    <h1 className="display-4 mb-1 text-data">{longestStreak} 🔥</h1>
                                    <p className="small text-muted mb-0">Longest Streak</p>
                                </div>
                            </div>
                        </div>

                        <h4 className="text-data mt-4 mb-3 border-top pt-3">Weekly Progress</h4>
                        <p className="small text-muted">A look at your consistency over the last 7 days (Mock Chart):</p>
                        <div className="chart-mock mb-4">
                            Week 10/24 - 10/30: 70% Avg Completion
                        </div>

                        <h4 className="text-data mt-4 mb-3 border-top pt-3">Quest Difficulty Breakdown</h4>
                        <p className="small text-muted">You are currently tackling **{hardQuests} Hard Quests** out of {totalHabits} total.</p>
                        <div className="progress" style={{height: '15px'}}>
                            {/* Mock progress bar data */}
                            <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">Easy</div>
                            <div className="progress-bar bg-warning" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">Medium</div>
                            <div className="progress-bar bg-danger" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">Hard</div>
                        </div>
                        <p className="text-end small text-muted mt-1">Mock Data: 25% Easy, 50% Medium, 25% Hard</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


// Main Application Component
const App = () => {
    const [userData, setUserData] = React.useState(initialUserData);
    const [habits, setHabits] = React.useState(initialHabits);
    const [journalEntries, setJournalEntries] = React.useState(initialJournalEntries);

    // Function to calculate XP/Gold rewards
    const getRewards = (difficulty) => {
        switch (difficulty) {
            case 'easy': return { xp: 10, gold: 5, bossDamage: 5 };
            case 'medium': return { xp: 25, gold: 15, bossDamage: 5 };
            case 'hard': return { xp: 50, gold: 30, bossDamage: 5 };
            default: return { xp: 0, gold: 0, bossDamage: 0 };
        }
    };

    // LOGIC: Task Completion (logHabit)
    const logHabit = (habitId) => {
        setHabits(prevHabits => {
            const habitIndex = prevHabits.findIndex(h => h.id === habitId);
            if (habitIndex === -1 || prevHabits[habitIndex].completedToday) return prevHabits;

            const habit = prevHabits[habitIndex];
            const { xp, gold, bossDamage } = getRewards(habit.difficulty);

            // 1. Update User Data
            setUserData(prevUserData => {
                let newXP = prevUserData.xp + xp;
                let newLevel = prevUserData.level;
                let newXPToLevel = prevUserData.xpToLevel;
                let newBossHp = Math.max(0, prevUserData.bossHp - bossDamage);
                let newGold = prevUserData.gold + gold;

                if (newXP >= newXPToLevel) {
                    newLevel++;
                    newXP -= newXPToLevel;
                    newXPToLevel *= 2; // Scaling difficulty

                    // Show a Level Up notification
                    alert(`*** LEVEL UP! *** You reached Level ${newLevel}!`);
                }

                if (newBossHp === 0) {
                    newBossHp = 100;
                    newGold += 200;
                    alert("Boss Defeated! You earned a special loot drop (200 Gold)!");
                }

                alert(`QUEST COMPLETE: "${habit.name}"! +${xp} XP | +${gold} Gold. Boss HP reduced by 5.`);

                return {
                    ...prevUserData,
                    xp: newXP,
                    level: newLevel,
                    xpToLevel: newXPToLevel,
                    bossHp: newBossHp,
                    gold: newGold
                };
            });

            // 2. Update Habit Status
            const newHabits = [...prevHabits];
            newHabits[habitIndex] = {
                ...habit,
                completedToday: true,
                streak: habit.isDaily ? habit.streak + 1 : habit.streak,
            };
            return newHabits;
        });
    };

    // LOGIC: Task Deletion (deleteHabit)
    const deleteHabit = (habitId) => {
        if (window.confirm("Are you sure you want to abandon this quest?")) {
            setHabits(prevHabits => prevHabits.filter(h => h.id !== habitId)); // Immutable state update (filter)
        }
    };

    // LOGIC: Reflection Deletion (deleteReflection)
    const deleteReflection = (reflectionId) => {
        if (window.confirm("Are you sure you want to delete this reflection?")) {
            setJournalEntries(prevEntries => prevEntries.filter(e => e.id !== reflectionId));
        }
    };

    // LOGIC: Save Reflection (saveReflection)
    const saveReflection = (text) => {
        if (text.trim() === '') return;

        const today = new Date().toISOString().slice(0, 10);
        const newReflection = {
            id: Date.now(),
            date: today,
            text: text
        };

        setJournalEntries(prevEntries => [newReflection, ...prevEntries]); // Add to the front
        alert('Reflection saved!');
    };

    // LOGIC: Add New Habit (addNewHabit - from Modal Form)
    const addNewHabit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.habitName.value;
        const difficulty = form.habitDifficulty.value;
        const isDaily = form.isDaily.checked;

        const newId = Math.max(...habits.map(h => h.id), 0) + 1;

        const newHabit = {
            id: newId,
            name: name,
            difficulty: difficulty,
            isDaily: isDaily,
            completedToday: false,
            streak: 0
        };

        setHabits(prevHabits => [...prevHabits, newHabit]);

        // Close modal (Relies on Bootstrap JS utility)
        const modalElement = document.getElementById('newHabitModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();

        form.reset();
        alert(`New Quest Created: "${name}"!`);
    };

    // LOGIC: Customize Hero (customizeHero - from Modal Form)
    const customizeHero = (e) => {
        e.preventDefault();
        const form = e.target;
        const heroName = form.heroName.value || "Hero";
        const avatarIcon = form.avatarIcon.value;
        const avatarColor = form.avatarColor.value;

        setUserData(prevData => ({
            ...prevData,
            heroName,
            avatarIcon,
            avatarColor
        }));

        // Close modal
        const modalElement = document.getElementById('customizeModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    };

    // Component Rendering
    return (
        <React.Fragment>
            <Header userData={userData} />

            <div className="container">
                <div className="row">

                    {/* Left Column: Hero Card */}
                    <div className="col-lg-3 mb-4">
                        <HeroCard userData={userData} />
                    </div>

                    {/* Middle Column: Quests */}
                    <div className="col-lg-6 mb-4">
                        <div className="card shadow-sm mb-4">
                            <div className="card-header bg-success text-white">
                                <h5 className="mb-0">Daily Quests & To-Dos (Tasks)</h5>
                            </div>
                            <QuestList habits={habits} logHabit={logHabit} deleteHabit={deleteHabit} />
                            <div className="card-footer d-flex justify-content-between">
                                <button className="btn btn-sm btn-outline-data" data-bs-toggle="modal" data-bs-target="#journalModal">
                                    📝 Log Reflection
                                </button>
                                <button className="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#newHabitModal">+ Add New Task</button>
                            </div>
                        </div>

                        {/* Boss Battle */}
                        <div className="card shadow-sm boss-card">
                            <div className="card-header bg-danger text-white">
                                <h5 className="mb-0">👹 Boss Battle: Procrastination Dragon</h5>
                            </div>
                            <div className="card-body">
                                <div className="progress">
                                    <div id="boss-hp-bar" className="progress-bar bg-danger" role="progressbar" style={{ width: `${userData.bossHp}%` }} aria-valuenow={userData.bossHp} aria-valuemin="0" aria-valuemax="100">{userData.bossHp} HP</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Leaderboards (Simplified) */}
                    <div className="col-lg-3 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-header bg-info text-white">
                                <h5 className="mb-0">Leaderboard & Progress</h5>
                            </div>
                            <div className="card-body">
                                <h6 className="text-muted border-bottom pb-1">Top Heroes (XP)</h6>
                                <ul id="leaderboard-list" className="list-unstyled small">
                                    <li>1. Elara (Lvl 15)</li>
                                    <li>2. Kael (Lvl 12)</li>
                                    <li>3. You ({userData.heroName}, Lvl {userData.level})</li>
                                    <li>4. Zylos (Lvl 9)</li>
                                </ul>
                            </div>
                            {/* Analytics Button Added Here */}
                            <div className="card-footer">
                                <button className="btn btn-sm btn-data w-100" data-bs-toggle="modal" data-bs-target="#analyticsModal">
                                    📊 View Analytics Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Modals (Defined outside the main flow but part of the App) --- */}

            {/* Customize Hero Modal */}
            <div className="modal fade" id="customizeModal" tabIndex="-1" aria-labelledby="customizeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-purple text-white">
                            <h5 className="modal-title" id="customizeModalLabel">🎨 Customize Your Hero</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={customizeHero}>
                                <div className="mb-3 text-center">
                                    <label className="form-label">Your Avatar</label>
                                    <div id="custom-avatar-preview" className="avatar-box large mx-auto mb-3" style={{ backgroundColor: userData.avatarColor }}>
                                        <span id="custom-avatar-icon">{userData.avatarIcon}</span>
                                    </div>
                                </div>
                                {/* NOTE: Form inputs rely on initial userData state but are not fully state-controlled in this simple setup */}
                                <div className="mb-3">
                                    <label htmlFor="heroName" className="form-label">Hero Name</label>
                                    <input type="text" className="form-control" id="heroName" defaultValue={userData.heroName} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="avatarIcon" className="form-label">Avatar Icon</label>
                                    <select className="form-select" id="avatarIcon" defaultValue={userData.avatarIcon}>
                                        <option value="🧑‍💻">🧑‍💻 Coder</option>
                                        <option value="🏃">🏃 Runner</option>
                                        <option value="📚">📚 Scholar</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="avatarColor" className="form-label">Armor Color</label>
                                    <input type="color" className="form-control form-control-color" id="avatarColor" defaultValue={userData.avatarColor} />
                                </div>
                                <button type="submit" className="btn btn-purple w-100">Save Customization</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Journal Modal */}
            <JournalModal journalEntries={journalEntries} saveReflection={saveReflection} deleteReflection={deleteReflection} />

            {/* Shop Modal */}
            <ShopModal userData={userData} setUserData={setUserData} />

            {/* Analytics Modal (NEW) */}
            <AnalyticsModal habits={habits} userData={userData} />


            {/* New Habit Modal */}
            <div className="modal fade" id="newHabitModal" tabIndex="-1" aria-labelledby="newHabitModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title" id="newHabitModalLabel">Create New Quest</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={addNewHabit}>
                                <div className="mb-3">
                                    <label htmlFor="habitName" className="form-label">Quest Name</label>
                                    <input type="text" className="form-control" id="habitName" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="habitDifficulty" className="form-label">Difficulty (Affects XP/Gold)</label>
                                    <select className="form-select" id="habitDifficulty" required>
                                        <option value="easy">Easy (+10 XP / +5 Gold)</option>
                                        <option value="medium">Medium (+25 XP / +15 Gold)</option>
                                        <option value="hard">Hard (+50 XP / +30 Gold)</option>
                                    </select>
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="isDaily" />
                                    <label className="form-check-label" htmlFor="isDaily">Recurring Daily Quest?</label>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Add Quest</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
};

// Mount the App component to the root element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
