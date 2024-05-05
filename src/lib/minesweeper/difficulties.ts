export interface StoryPart {
    revealCount: number;
    text: string;
}

const story_very_easy: StoryPart[] = [
    {
        revealCount: 300,
        text: `<h2>Chapter 1: The Silent Field</h2>
        In a world scarred by endless conflict, young Jareth's life revolves around the ominous task of finding hidden landmines, a job that keeps him constantly on edge as he navigates the treacherous battlefield.
        <hr/>
        <i>Play in a higher difficulty to see the full story</i>`,
    },
    {
        revealCount: 600,
        text: `<h2>Chapter 404: Where is the end?</h2>
        Are you sure you don't want to know the engaging story of Jareth?
        <hr/>
        <i>Have fun!</i>`,
    },
];

const story_easy: StoryPart[] = [
    {
        revealCount: 100,
        text: `<h2>Chapter 1: The Silent Field</h2>
        In a world scarred by endless conflict, young Jareth's life revolves around the ominous task of finding hidden landmines, a job that keeps him constantly on edge as he navigates the treacherous battlefield.
        <hr/>
        <i>Next chapter after 200 cells cleared</i>
        <br>
        <i>To have a more detailled version of this story, play a higher difficulty.</i>`,
    },
    {
        revealCount: 200,
        text: `<h2>Chapter 2: A Shattered Childhood</h2>
        Jareth's early years were marked by tragedy, witnessing the destruction of his hometown by a landmine explosion that took the lives of his parents, leaving him orphaned and scarred by the horrors of war.
        <hr/>
        <i>Next chapter after 300 cells cleared</i>`,
    },
    {
        revealCount: 300,
        text: `<h2>Chapter 3: The Mentor's Guidance</h2>
        Under the tutelage of an experienced mine detector, Jareth learns the delicate art of defusing landmines, discovering the fine balance between intuition and precision required for the job.
        <hr/>
        <i>Next chapter after 400 cells cleared</i>`,
    },
    {
        revealCount: 400,
        text: `<h2>Chapter 4: The Deadly Dance</h2>
        As Jareth grows into his role, he faces the relentless pressure of racing against time, each sweep of his detector inching him closer to either salvation or disaster, all while uncovering the harrowing stories behind each buried explosive.
        <hr/>
        <i>Next chapter after 500 cells cleared</i>`,
    },
    {
        revealCount: 500,
        text: `<h2>Chapter 5: The Secret Unearthed</h2>
        In the midst of his dangerous work, Jareth stumbles upon a hidden cache of advanced, state-of-the-art landmines, leaving him to question the motives and players behind the ongoing conflict and the true nature of his mission.
        <hr/>
        <i>Next chapter after 600 cells cleared</i>`,
    },
    {
        revealCount: 600,
        text: `<h2>Chapter 6: The Dangerous Allure</h2>
        Drawn to a fellow mine detector named Elara, Jareth becomes entangled in a passionate and forbidden romance, further complicating his already perilous existence.
        <hr/>
        <i>Next chapter after 700 cells cleared</i>`,
    },
    {
        revealCount: 700,
        text: `<h2>Chapter 7: Echoes of the Past</h2>
        A chance discovery leads Jareth to a forgotten diary from a soldier who once roamed the same battlefields, providing eerie parallels to his own life and raising questions about destiny and the cyclical nature of war.
        <hr/>
        <i>Next chapter after 800 cells cleared</i>`,
    },
    {
        revealCount: 800,
        text: `<h2>Chapter 8: The Ticking Clock</h2>
        Jareth and Elara embark on a dangerous mission to disarm a network of landmines buried beneath an ancient city, facing not only the physical danger of their work but also the looming threat of betrayal from within their ranks.
        <hr/>
        <i>Next chapter after 900 cells cleared</i>`,
    },
    {
        revealCount: 900,
        text: `<h2>Chapter 9: Whispers of Peace</h2>
        Amidst the chaos of conflict, a fragile ceasefire emerges, offering a glimmer of hope to Jareth and Elara, who dream of a future beyond the deadly minefields.
        <hr/>
        <i>Next chapter after 1000 cells cleared</i>`,
    },
    {
        revealCount: 1000,
        text: `<h2>Chapter 10: Unearthing the Truth</h2>
        Jareth's relentless pursuit of answers takes him deep into the heart of a conspiracy involving powerful factions profiting from the perpetual warfare, leading to a shocking revelation that could change the course of history.
        <hr/>
        <i>Next chapter after 1100 cells cleared</i>`,
    },
    {
        revealCount: 1100,
        text: `<h2>Chapter 11: The Final Sweep</h2>
        Jareth faces his most daunting task yet, navigating a field littered with landmines and betrayal, as he races against time to not only save himself and Elara but to expose the truth that has remained buried for too long.
        <hr/>
        <i>Next chapter after 1200 cells cleared</i>`,
    },
    {
        revealCount: 1200,
        text: `<h2>Chapter 12: A World Unmined</h2>
        In a gripping climax, Jareth confronts the forces that have perpetuated the cycle of war and discovers a way to render the landmines obsolete, offering a glimmer of hope for a world long haunted by the deadly specter beneath its feet.
        <hr/>
        <i>To have more details on the solution Jareth found, play a higher difficulty.</i>`,
    },
];

const story_normal: StoryPart[] = [
    {
        revealCount: 50,
        text: `<h2>Chapter 1: The Silent Field</h2>
        In a world scarred by endless conflict, young Jareth's life revolves around the ominous task of finding hidden landmines, a job that keeps him constantly on edge as he navigates the treacherous battlefield. Each step he takes is measured, each swing of his metal detector a heartbeat in a rhythm of life and death. The once-vibrant landscapes are now war-torn wastelands, and his existence, like the mines he seeks, teeters on the precipice of destruction.
        <hr/>
        <i>Next chapter after 100 cells cleared</i>
        <br>
        <i>To have illustrations, play the higher difficulty.</i>`,
    },
    {
        revealCount: 100,
        text: `<h2>Chapter 2: A Shattered Childhood</h2>
        Jareth's early years were marked by tragedy, witnessing the destruction of his hometown by a landmine explosion that took the lives of his parents, leaving him orphaned and scarred by the horrors of war. The deafening blast that tore through their peaceful village forever etched the image of devastation into his young mind, and from that day forward, he bore the weight of a shattered childhood and a burning desire to make the world safer, one landmine at a time.
        <hr/>
        <i>Next chapter after 150 cells cleared</i>`,
    },
    {
        revealCount: 150,
        text: `<h2>Chapter 3: The Mentor's Guidance</h2>
        Under the tutelage of an experienced mine detector, Jareth learns the delicate art of defusing landmines, discovering the fine balance between intuition and precision required for the job. His mentor, a grizzled veteran of countless minefields, imparts not only the technical skills but also the unwritten rules of survival in this perilous occupation. As days turn into weeks and weeks into years, Jareth transforms from an apprehensive novice into a methodical expert, honing his ability to hear the deadly whispers of hidden explosives buried beneath the earth.
        <hr/>
        <i>Next chapter after 200 cells cleared</i>`,
    },
    {
        revealCount: 200,
        text: `<h2>Chapter 4: The Deadly Dance</h2>
        As Jareth grows into his role, he faces the relentless pressure of racing against time, each sweep of his detector inching him closer to either salvation or disaster, all while uncovering the harrowing stories behind each buried explosive. With each metallic ping and every tense moment when his heart seems to pause, he's reminded of the fragility of life and the ominous dance he performs daily—a dance between life and death, where a single misstep can plunge him into the abyss of destruction. In the midst of this deadly ballet, he begins to understand that the landmines he seeks to disarm hold not just physical danger but the haunting echoes of the past, connecting him to a world scarred by conflict in ways he never imagined.
        <hr/>
        <i>Next chapter after 250 cells cleared</i>`,
    },
    {
        revealCount: 250,
        text: `<h2>Chapter 5: The Secret Unearthed</h2>
        In the midst of his dangerous work, Jareth stumbles upon a hidden cache of advanced, state-of-the-art landmines, leaving him to question the motives and players behind the ongoing conflict and the true nature of his mission. These high-tech devices, unlike any he has encountered before, raise troubling questions about the power dynamics at play in the war-torn world. As he meticulously disarms them, he begins to unravel a web of secrets that suggests a sinister agenda driving the relentless deployment of landmines. With each mine he dismantles, the enigma deepens, pushing Jareth closer to a truth that could change the course of his life and the world around him.
        <hr/>
        <i>Next chapter after 300 cells cleared</i>`,
    },
    {
        revealCount: 300,
        text: `<h2>Chapter 6: The Dangerous Allure</h2>
        Drawn to a fellow mine detector named Elara, Jareth becomes entangled in a passionate and forbidden romance, further complicating his already perilous existence. Their shared experiences in the field forge a unique connection, one that transcends the boundaries of their dangerous profession. Yet, as their love blossoms amidst the chaos of war, they must navigate the ever-present specter of danger, betrayal, and the forbidden nature of their relationship, all while yearning for a future free from the ominous shadows of landmines that threaten to consume them.
        <hr/>
        <i>Next chapter after 350 cells cleared</i>`,
    },
    {
        revealCount: 350,
        text: `<h2>Chapter 7: Echoes of the Past</h2>
        A chance discovery leads Jareth to a forgotten diary from a soldier who once roamed the same battlefields, providing eerie parallels to his own life and raising questions about destiny and the cyclical nature of war. Among the debris of a decimated battlefield, Jareth uncovers a tattered journal, its pages yellowed with age. As he reads the words of a long-lost soldier who faced the same dangers and dilemmas, he's struck by the haunting familiarity of their experiences. The diary unveils a tapestry of emotions, fears, and hopes that resonate deeply within him, sparking a journey of self-discovery and a quest to break the cycle of violence that has gripped their world for generations.
        <hr/>
        <i>Next chapter after 400 cells cleared</i>`,
    },
    {
        revealCount: 400,
        text: `<h2>Chapter 8: The Ticking Clock</h2>
        Jareth and Elara embark on a dangerous mission to disarm a network of landmines buried beneath an ancient city, facing not only the physical danger of their work but also the looming threat of betrayal from within their ranks. Beneath the crumbling remnants of an ancient civilization, they navigate a labyrinth of uncertainty, racing against the ticking clock of time as they meticulously work to disarm the deadly traps. However, as they delve deeper into the mission, they begin to suspect that one among them may be secretly working against them, casting a shadow of doubt over their every move and threatening to turn their quest for peace into a battle for survival.
        <hr/>
        <i>Next chapter after 450 cells cleared</i>`,
    },
    {
        revealCount: 450,
        text: `<h2>Chapter 9: Whispers of Peace</h2>
        Amidst the chaos of conflict, a fragile ceasefire emerges, offering a glimmer of hope to Jareth and Elara, who dream of a future beyond the deadly minefields. As the world's leaders cautiously negotiate a truce, Jareth and Elara find themselves caught between the remnants of war and the tantalizing promise of peace. With the cessation of hostilities, they dare to envision a life free from the relentless pursuit of landmines and destruction, where their love can flourish without the constant threat of annihilation. Yet, they must tread carefully, for in the world they inhabit, even the most fragile peace can shatter like glass.
        <hr/>
        <i>Next chapter after 500 cells cleared</i>`,
    },
    {
        revealCount: 500,
        text: `<h2>Chapter 10: Unearthing the Truth</h2>
        Jareth's relentless pursuit of answers takes him deep into the heart of a conspiracy involving powerful factions profiting from the perpetual warfare, leading to a shocking revelation that could change the course of history. Fueled by a burning desire to unveil the hidden truths behind the landmine industry, Jareth embarks on a perilous journey that exposes the dark underbelly of a world consumed by conflict. In a daring investigation, he follows the twisted threads of corruption, uncovering a web of deception woven by those who profit from the chaos. As he edges closer to the heart of the conspiracy, he stumbles upon a revelation so shocking that it could not only alter the fate of the war-torn world but also jeopardize his own safety in ways he never anticipated.
        <hr/>
        <i>Next chapter after 550 cells cleared</i>`,
    },
    {
        revealCount: 550,
        text: `<h2>Chapter 11: The Final Sweep</h2>
        Jareth faces his most daunting task yet, navigating a field littered with landmines and betrayal, as he races against time to not only save himself and Elara but to expose the truth that has remained buried for too long. In the climactic showdown, the battlefield becomes a deadly chessboard where every step could be their last. As Jareth and Elara push the boundaries of their skills and resilience, they confront not only the physical threats of the treacherous minefield but also the specter of betrayal from an unexpected source within their trusted circle. With the truth hanging in the balance, they must summon all their courage and ingenuity to complete their final, perilous sweep and ensure that the world can no longer ignore the sinister forces manipulating its fate.
        <hr/>
        <i>Next chapter after 600 cells cleared</i>`,
    },
    {
        revealCount: 600,
        text: `<h2>Chapter 12: A World Unmined</h2>
        In a gripping climax, Jareth confronts the forces that have perpetuated the cycle of war and discovers a way to render the landmines obsolete, offering a glimmer of hope for a world long haunted by the deadly specter beneath its feet. With determination born of both love and a profound sense of duty, Jareth and Elara face down the shadowy figures behind the landmine conspiracy, exposing their malevolent plans to a world desperate for peace. In an astonishing revelation, Jareth unveils a groundbreaking technology capable of neutralizing landmines and rendering them harmless, a discovery that could pave the way for a future where the world can finally heal from the scars of war. As the final detonation echoes across the battlefield, a collective sigh of relief sweeps through the world, and the once-silent fields begin to resonate with the hope of a brighter, unmined future.
        <hr/>
        <i>To have illustrations, play the higher difficulty.</i>`,
    },
];

const story_hard: StoryPart[] = [
    {
        revealCount: 50,
        text: `<h2>Chapter 1: The Silent Field</h2>
        <img src="/illustration/image1.png" alt="Jareth standing in front of a mine field." style="width: 20rem; display: block; margin: 1rem auto;">
        In a world scarred by endless conflict, young Jareth's life revolves around the ominous task of finding hidden landmines, a job that keeps him constantly on edge as he navigates the treacherous battlefield. Each step he takes is measured, each swing of his metal detector a heartbeat in a rhythm of life and death. The once-vibrant landscapes are now war-torn wastelands, and his existence, like the mines he seeks, teeters on the precipice of destruction.
        <hr/>
        <i>Next chapter after 100 cells cleared</i>`,
    },
    {
        revealCount: 100,
        text: `<h2>Chapter 2: A Shattered Childhood</h2>
        <img src="/illustration/image2.png" alt="" style="width: 20rem; display: block; margin: 1rem auto;">
        Jareth's early years were marked by tragedy, witnessing the destruction of his hometown by a landmine explosion that took the lives of his parents, leaving him orphaned and scarred by the horrors of war. The deafening blast that tore through their peaceful village forever etched the image of devastation into his young mind, and from that day forward, he bore the weight of a shattered childhood and a burning desire to make the world safer, one landmine at a time.
        <hr/>
        <i>Next chapter after 150 cells cleared</i>`,
    },
    {
        revealCount: 150,
        text: `<h2>Chapter 3: The Mentor's Guidance</h2>
        <img src="/illustration/image3.png" alt="" style="width: 20rem; display: block; margin: 1rem auto;">
        Under the tutelage of an experienced mine detector, Jareth learns the delicate art of defusing landmines, discovering the fine balance between intuition and precision required for the job. His mentor, a grizzled veteran of countless minefields, imparts not only the technical skills but also the unwritten rules of survival in this perilous occupation. As days turn into weeks and weeks into years, Jareth transforms from an apprehensive novice into a methodical expert, honing his ability to hear the deadly whispers of hidden explosives buried beneath the earth.
        <hr/>
        <i>Next chapter after 200 cells cleared</i>`,
    },
    {
        revealCount: 200,
        text: `<h2>Chapter 4: The Deadly Dance</h2>
        <img src="/illustration/image4.png" alt="" style="width: 20rem; display: block; margin: 1rem auto;">
        As Jareth grows into his role, he faces the relentless pressure of racing against time, each sweep of his detector inching him closer to either salvation or disaster, all while uncovering the harrowing stories behind each buried explosive. With each metallic ping and every tense moment when his heart seems to pause, he's reminded of the fragility of life and the ominous dance he performs daily—a dance between life and death, where a single misstep can plunge him into the abyss of destruction. In the midst of this deadly ballet, he begins to understand that the landmines he seeks to disarm hold not just physical danger but the haunting echoes of the past, connecting him to a world scarred by conflict in ways he never imagined.
        <hr/>
        <i>Next chapter after 250 cells cleared</i>`,
    },
    {
        revealCount: 250,
        text: `<h2>Chapter 5: The Secret Unearthed</h2>
        <img src="/illustration/image5.png" alt="" style="width: 20rem; display: block; margin: 1rem auto;">
        In the midst of his dangerous work, Jareth stumbles upon a hidden cache of advanced, state-of-the-art landmines, leaving him to question the motives and players behind the ongoing conflict and the true nature of his mission. These high-tech devices, unlike any he has encountered before, raise troubling questions about the power dynamics at play in the war-torn world. As he meticulously disarms them, he begins to unravel a web of secrets that suggests a sinister agenda driving the relentless deployment of landmines. With each mine he dismantles, the enigma deepens, pushing Jareth closer to a truth that could change the course of his life and the world around him.
        <hr/>
        <i>Next chapter after 300 cells cleared</i>`,
    },
    {
        revealCount: 300,
        text: `<h2>Chapter 6: The Dangerous Allure</h2>
        <img src="/illustration/image6.png" alt="" style="width: 20rem; display: block; margin: 1rem auto;">
        Drawn to a fellow mine detector named Elara, Jareth becomes entangled in a passionate and forbidden romance, further complicating his already perilous existence. Their shared experiences in the field forge a unique connection, one that transcends the boundaries of their dangerous profession. Yet, as their love blossoms amidst the chaos of war, they must navigate the ever-present specter of danger, betrayal, and the forbidden nature of their relationship, all while yearning for a future free from the ominous shadows of landmines that threaten to consume them.
        <hr/>
        <i>Next chapter after 350 cells cleared</i>`,
    },
    {
        revealCount: 350,
        text: `<h2>Chapter 7: Echoes of the Past</h2>
        <img src="/illustration/image7.png" alt="" style="width: 20rem; display: block; margin: 1rem auto;">
        A chance discovery leads Jareth to a forgotten diary from a soldier who once roamed the same battlefields, providing eerie parallels to his own life and raising questions about destiny and the cyclical nature of war. Among the debris of a decimated battlefield, Jareth uncovers a tattered journal, its pages yellowed with age. As he reads the words of a long-lost soldier who faced the same dangers and dilemmas, he's struck by the haunting familiarity of their experiences. The diary unveils a tapestry of emotions, fears, and hopes that resonate deeply within him, sparking a journey of self-discovery and a quest to break the cycle of violence that has gripped their world for generations.
        <hr/>
        <i>Next chapter after 400 cells cleared</i>`,
    },
    {
        revealCount: 400,
        text: `<h2>Chapter 8: The Ticking Clock</h2>
        <img src="/illustration/image8.png" alt="" style="width: 20rem; display: block; margin: 1rem auto;">
        Jareth and Elara embark on a dangerous mission to disarm a network of landmines buried beneath an ancient city, facing not only the physical danger of their work but also the looming threat of betrayal from within their ranks. Beneath the crumbling remnants of an ancient civilization, they navigate a labyrinth of uncertainty, racing against the ticking clock of time as they meticulously work to disarm the deadly traps. However, as they delve deeper into the mission, they begin to suspect that one among them may be secretly working against them, casting a shadow of doubt over their every move and threatening to turn their quest for peace into a battle for survival.
        <hr/>
        <i>Next chapter after 450 cells cleared</i>`,
    },
    {
        revealCount: 450,
        text: `<h2>Chapter 9: Whispers of Peace</h2>
        <img src="/illustration/image9.png" alt="" style="width: 20rem; display: block; margin: 1rem auto;">
        Amidst the chaos of conflict, a fragile ceasefire emerges, offering a glimmer of hope to Jareth and Elara, who dream of a future beyond the deadly minefields. As the world's leaders cautiously negotiate a truce, Jareth and Elara find themselves caught between the remnants of war and the tantalizing promise of peace. With the cessation of hostilities, they dare to envision a life free from the relentless pursuit of landmines and destruction, where their love can flourish without the constant threat of annihilation. Yet, they must tread carefully, for in the world they inhabit, even the most fragile peace can shatter like glass.
        <hr/>
        <i>Next chapter after 500 cells cleared</i>`,
    },
    {
        revealCount: 500,
        text: `<h2>Chapter 10: Unearthing the Truth</h2>
        <img src="/illustration/image10.png" alt="" style="width: 20rem; display: block; margin: 1rem auto;">
        Jareth's relentless pursuit of answers takes him deep into the heart of a conspiracy involving powerful factions profiting from the perpetual warfare, leading to a shocking revelation that could change the course of history. Fueled by a burning desire to unveil the hidden truths behind the landmine industry, Jareth embarks on a perilous journey that exposes the dark underbelly of a world consumed by conflict. In a daring investigation, he follows the twisted threads of corruption, uncovering a web of deception woven by those who profit from the chaos. As he edges closer to the heart of the conspiracy, he stumbles upon a revelation so shocking that it could not only alter the fate of the war-torn world but also jeopardize his own safety in ways he never anticipated.
        <hr/>
        <i>Next chapter after 550 cells cleared</i>`,
    },
    {
        revealCount: 550,
        text: `<h2>Chapter 11: The Final Sweep</h2>
        <img src="/illustration/image11.png" alt="" style="width: 20rem; display: block; margin: 1rem auto;">
        Jareth faces his most daunting task yet, navigating a field littered with landmines and betrayal, as he races against time to not only save himself and Elara but to expose the truth that has remained buried for too long. In the climactic showdown, the battlefield becomes a deadly chessboard where every step could be their last. As Jareth and Elara push the boundaries of their skills and resilience, they confront not only the physical threats of the treacherous minefield but also the specter of betrayal from an unexpected source within their trusted circle. With the truth hanging in the balance, they must summon all their courage and ingenuity to complete their final, perilous sweep and ensure that the world can no longer ignore the sinister forces manipulating its fate.
        <hr/>
        <i>Next chapter after 600 cells cleared</i>`,
    },
    {
        revealCount: 600,
        text: `<h2>Chapter 12: A World Unmined</h2>
        <img src="/illustration/image12.png" alt="" style="width: 20rem; display: block; margin: 1rem auto;">
        In a gripping climax, Jareth confronts the forces that have perpetuated the cycle of war and discovers a way to render the landmines obsolete, offering a glimmer of hope for a world long haunted by the deadly specter beneath its feet. With determination born of both love and a profound sense of duty, Jareth and Elara face down the shadowy figures behind the landmine conspiracy, exposing their malevolent plans to a world desperate for peace. In an astonishing revelation, Jareth unveils a groundbreaking technology capable of neutralizing landmines and rendering them harmless, a discovery that could pave the way for a future where the world can finally heal from the scars of war. As the final detonation echoes across the battlefield, a collective sigh of relief sweeps through the world, and the once-silent fields begin to resonate with the hope of a brighter, unmined future.
        <hr/>
        <i>Congratulations!</i>`,
    },
];

export const difficulty_levels = [
    { value: 0.15, text: "Breeze Mode", story: story_very_easy },
    { value: 0.2, text: "Relaxed", story: story_easy },
    { value: 0.27, text: "Moderate", story: story_normal },
    { value: 0.35, text: "Challenging", story: story_hard },
];
