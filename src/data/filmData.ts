export type Character = {
    name: string;
    role: string;
    cat: 'hros' | 'comploteurs' | 'animaux' | 'creatures' | 'mchant';
    inspiration: string;
    realLife?: {
        occ: string;
        fact: string;
        power: string;
    };
    img?: string;
    classe?: string;
    model?: string;
    portrait?: string;
    video?: string;
    themeColor?: string;
};

export const heroesData: Character[] = [
    {
        name: "Nicolas Vidal", role: "Leader & Expert Décryptage", cat: "hros",
        inspiration: "Leader charismatique, archéologue/hacker, expert en décryptage de l'Ancien Empire. Regard déterminé, veste marron et sac à dos.",
        realLife: {
            occ: "Journaliste & Fondateur de Putsch",
            fact: "Spécialiste de la critique média et des libertés.",
            power: "Capacité à fédérer les voix dissidentes."
        },
        img: "/assets/persos_de_reference/version_classe_hero/nicolas.webp",
        classe: "/assets/persos_de_reference/version_classe_hero/nicolas.webp",
        model: "/assets/persos_de_reference/Model_sheet_heros/nicolas.webp",
        portrait: "/assets/persos_de_reference/portraits_heros/nicolasclean.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/nicolas.webm"
    },
    {
        name: "Clémence", role: "Reporter Intrépide", cat: "hros",
        inspiration: "Reporter de terrain, moteur de l'enquête. Cheveux bouclés roux, chemise bleu foncé, toujours prête à foncer en première ligne.",
        realLife: {
            occ: "Journaliste chez Tocsin",
            fact: "Reporter de terrain infatigable.",
            power: "Courage face aux menaces."
        },
        img: "/assets/persos_de_reference/version_classe_hero/clemence.webp",
        classe: "/assets/persos_de_reference/version_classe_hero/clemence.webp",
        model: "/assets/persos_de_reference/Model_sheet_heros/clemence.webp",
        portrait: "/assets/persos_de_reference/portraits_heros/clemenceclean.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/clemence.webm"
    },
    {
        name: "Idriss Aberkane", role: "Génie Scientifique", cat: "hros",
        inspiration: "Génie excentrique, maître de l'ancienne technologie et des pièges IS-BE. Veste camouflage, intelligence stratégique.",
        realLife: {
            occ: "Chercheur & Conférencier",
            fact: "Expert en neurosciences et biomimétisme.",
            power: "Intelligence stratégique hors norme."
        },
        img: "/assets/persos_de_reference/version_classe_hero/idriss.webp",
        classe: "/assets/persos_de_reference/version_classe_hero/idriss.webp",
        model: "/assets/persos_de_reference/Model_sheet_heros/idriss.webp",
        portrait: "/assets/persos_de_reference/portraits_heros/idrissclean.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/idriss.webm"
    },
    {
        name: "André Bercoff", role: "Mentor Historien", cat: "hros",
        inspiration: "Gardien des secrets oubliés de l'humanité. Chauve avec lunettes, voix grave, connaît l'histoire occulte de la Planète-Prison.",
        realLife: {
            occ: "Journaliste & Animateur Radio",
            fact: "Voix iconique de Sud Radio.",
            power: "Capacité à galvaniser l'opinion publique."
        },
        img: "/assets/persos_de_reference/version_classe_hero/andre.webp",
        classe: "/assets/persos_de_reference/version_classe_hero/andre.webp",
        model: "/assets/persos_de_reference/Model_sheet_heros/andre.webp",
        portrait: "/assets/persos_de_reference/portraits_heros/andreclean.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/Andre.webm"
    },
    {
        name: "Béatrice Rosen", role: "Stratège Combative", cat: "hros",
        inspiration: "Combative et déterminée, utilise son charisme pour désamorcer les pièges. Chemise bleue, pose assurée, spécialiste en infiltration.",
        realLife: {
            occ: "Actrice & Productrice",
            fact: "Star internationale, activiste pour la vérité.",
            power: "Influence médiatique et charisme naturel."
        },
        img: "/assets/persos_de_reference/version_classe_hero/beatrice.webp",
        classe: "/assets/persos_de_reference/version_classe_hero/beatrice.webp",
        model: "/assets/persos_de_reference/Model_sheet_heros/beatrice.webp",
        portrait: "/assets/persos_de_reference/portraits_heros/batriceclean.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/beatrice.webm"
    },
    {
        name: "AubonTweet", role: "Expert Infiltration", cat: "hros",
        inspiration: "Vigie numérique, expert en infiltration et décryptage réseau. Mystérieux, discret, toujours calme sous pression.",
        realLife: {
            occ: "Vigie Méditique & Analyste",
            fact: "Spécialiste de l'analyse des courants d'opinion numérique.",
            power: "Capacité d'infiltration et de décryptage réseau."
        },
        img: "/assets/persos_de_reference/version_classe_hero/abtf.webp",
        classe: "/assets/persos_de_reference/version_classe_hero/abtf.webp",
        model: "/assets/persos_de_reference/Model_sheet_heros/abtf.webp",
        portrait: "/assets/persos_de_reference/portraits_heros/abtfclean.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/abtf.webm"
    },
    {
        name: "Alexis Poulin", role: "Analyste & Pilote", cat: "hros",
        inspiration: "Stratège géopolitique et pilote d'élite. Gère les véhicules et l'anticipation des manoeuvres de XoroX.",
        realLife: {
            occ: "Analyste Politique & Stratège",
            fact: "Expert en décryptage des stratégies de pouvoir.",
            power: "Analyse prédictive et anticipation."
        },
        img: "/assets/persos_de_reference/version_classe_hero/alexis.webp",
        classe: "/assets/persos_de_reference/version_classe_hero/alexis.webp",
        model: "/assets/persos_de_reference/Model_sheet_heros/alexis.webp",
        portrait: "/assets/persos_de_reference/portraits_heros/alexisclean.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/Alexis.webm"
    },
    {
        name: "Charles Alloncle", role: "Force Morale", cat: "hros",
        inspiration: "Aventurier politique, incarne la résistance et la souveraineté. Force morale du groupe dans les moments critiques.",
        realLife: {
            occ: "Homme Politique (Député)",
            fact: "Défenseur acharné de la souveraineté.",
            power: "Leadership naturel et force de conviction."
        },
        img: "/assets/persos_de_reference/version_classe_hero/Charles.webp",
        classe: "/assets/persos_de_reference/version_classe_hero/Charles.webp",
        model: "/assets/persos_de_reference/Model_sheet_heros/charles.webp",
        portrait: "/assets/persos_de_reference/portraits_heros/charlesclean.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/charles.webm"
    },
    {
        name: "Rudy", role: "Directeur de Conspiracy Watch", cat: "comploteurs",
        inspiration: "Expert en désinformation et théories du complot.",
        realLife: {
            occ: "Directeur de Conspiracy Watch",
            fact: "Spécialiste de la lutte contre les fake news.",
            power: "Décryptage des manipulations informationnelles."
        },
        img: "/assets/persos_de_reference/version_classe_hero/rudy.webp",
        classe: "/assets/persos_de_reference/version_classe_hero/rudy.webp",
        model: "/assets/persos_de_reference/comploteurs/rudy.webp",
        portrait: "/assets/persos_de_reference/portraits_heros/rudy.jpg",
        video: "/assets/persos_de_reference/comploteurs/rudy.webm"
    },
    {
        name: "Julien", role: "Analyste Média", cat: "comploteurs",
        inspiration: "Surveille les flux d'information pour XOROX.",
        realLife: {
            occ: "Journaliste & Producteur",
            fact: "Expert en décryptage des médias.",
            power: "Analyse des narratifs dominants."
        },
        img: "/assets/persos_de_reference/version_classe_hero/julien.webp",
        classe: "/assets/persos_de_reference/version_classe_hero/julien.webp",
        model: "/assets/persos_de_reference/comploteurs/julien_classe.webp",
        portrait: "/assets/persos_de_reference/portraits_heros/julien.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/julien.webm"
    },
    {
        name: "Tristan", role: "Vigie Numérique", cat: "comploteurs",
        inspiration: "Traque les dissidents dans le métavers.",
        realLife: {
            occ: "Spécialiste du numérique",
            fact: "Expert en cultures web et complotisme.",
            power: "Infiltration des réseaux sociaux."
        },
        img: "/assets/persos_de_reference/version_classe_hero/tristan.webp",
        classe: "/assets/persos_de_reference/version_classe_hero/tristan.webp",
        model: "/assets/persos_de_reference/comploteurs/tristan.webp",
        portrait: "/assets/persos_de_reference/portraits_heros/tristan.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/tristan.webm"
    },
    {
        name: "Nala", role: "Gardien Canin", cat: "animaux",
        inspiration: "Fidèle berger, détecteur d'anomalies de code.",
        img: "/assets/persos_de_reference/chiens/nala.jpg",
        video: "/assets/persos_de_reference/chiens/nala_video.webm"
    },
    {
        name: "Zorz", role: "Éclaireur Vif", cat: "animaux",
        inspiration: "Petit but redoutable en reconnaissance urbaine.",
        img: "/assets/persos_de_reference/chiens/zorz.jpg",
        video: "/assets/persos_de_reference/chiens/zorz_video.webm"
    },
    {
        name: "Alien Alpha", role: "Sentinelle Humanoïde", cat: "creatures",
        inspiration: "Guerrier d'élite de XOROX, rapide et impitoyable.",
        img: "/assets/persos_de_reference/creatures/alien1/ALIEN_2_SUPER_GOOD.png",
        model: "/assets/persos_de_reference/creatures/alien1/ALien2_model_sheet.jpeg",
        portrait: "/assets/persos_de_reference/creatures/alien1/alien_type2_2aa.png",
        video: "/assets/persos_de_reference/creatures/alien1/alien_1_presentation.webm"
    },
    {
        name: "Primat de Code", role: "Horreur Non-Humanoïde", cat: "creatures",
        inspiration: "Une abomination digitale rampante, cauchemar des serveurs.",
        img: "/assets/persos_de_reference/creatures/alien2/ALIEN2.JPG",
        model: "/assets/persos_de_reference/creatures/alien2/alien1sheet.jpeg",
        portrait: "/assets/persos_de_reference/creatures/alien2/Alien_Vue_Profil_Droit_V2.png",
        video: "/assets/persos_de_reference/creatures/alien2/alien_2_presentation.webm"
    },
    {
        name: "Insecte Épineux", role: "Sentinelle Bio-mécanique", cat: "creatures",
        inspiration: "Une abomination bio-mécanique dotée de pointes acérées, capable de se camoufler dans les rochers et servant de drone organique de suppression.",
        img: "/assets/persos_de_reference/creatures/insecte/insecte_blanc.png",
        model: "/assets/persos_de_reference/creatures/insecte/insecte_SHEET.jpeg",
        portrait: "/assets/persos_de_reference/creatures/insecte/Insecte_épineux_-_vue_3_4_arrière.png",
        video: "/assets/persos_de_reference/creatures/insecte/insecte_presentation.webm"
    },
    {
        name: "XoroX", role: "L'Architecte", cat: "mchant",
        inspiration: "Version animée du portrait cyber : gros, menaçant, trône holographique, code binaire et verrous partout, énergie bleu-vert sombre.",
        img: "/assets/persos_de_reference/XoroX/XOROX_GOOD.webp",
        video: "/assets/persos_de_reference/heros_presentation_video/xorox.webm"
    }
];

export const sceneBrowserData = [
    { title: "Infiltration New York", media: "abtf_new_york_street.webp", type: "image", desc: "AubonTweet repère les sentinelles dans les rues dithered." },
    { title: "Brèche Antarctique", media: "boat_antartic.webm", type: "video", desc: "L'approche finale du noyau par la mer de glace." },
    { title: "Complot des 3", media: "3_comploteurs.webp", type: "image", desc: "Le triumvirat de l'ombre discute de la censure globale." },
    { title: "Évasion Souterraine", media: "beatrice_entrepot_fuite.webm", type: "video", desc: "Béatrice échappe in extremis aux gardes de XoroX." }
];

export const mediaFiles = [
    { name: "3_comploteurs.webp", type: "image" },
    { name: "3_comploteurs2.webp", type: "image" },
    { name: "abtf.webm", type: "video" },
    { name: "abtf_clem_stop_interview.webm", type: "video" },
    { name: "abtf_clemence_alien_ville.webm", type: "video" },
    { name: "abtf_new_york_street.webp", type: "image" },
    { name: "abtf_walk.webm", type: "video" },
    { name: "alexis.webm", type: "video" },
    { name: "alexis_alien.webp", type: "image" },
    { name: "alexis_et_andre.webp", type: "image" },
    { name: "alexis_et_andre_good.webp", type: "image" },
    { name: "alexis_nicolas_entree_grotte.webm", type: "video" },
    { name: "alie2earth.webp", type: "image" },
    { name: "alien2.webp", type: "image" },
    { name: "andre_avion.webm", type: "video" },
    { name: "andre_avion2.webm", type: "video" },
    { name: "andre_avion3.webm", type: "video" },
    { name: "andre_charles_chateau.webp", type: "image" },
    { name: "andre_pilote.webp", type: "image" },
    { name: "andre_pose_antartique.webm", type: "video" },
    { name: "bea_conspi.webm", type: "video" },
    { name: "bea_flatteuse.webm", type: "video" },
    { name: "bea_idriss_train.webm", type: "video" },
    { name: "beat.webm", type: "video" },
    { name: "beat_charles.webp", type: "image" },
    { name: "beat_comploteurs.webp", type: "image" },
    { name: "beat_vol.webm", type: "video" },
    { name: "beatrice_clemence_serveurs.webp", type: "image" },
    { name: "beatrice_entrepot_fuite.webm", type: "video" },
    { name: "beatrice_karate.webm", type: "video" },
    { name: "beatrice_sexy.webm", type: "video" },
    { name: "beatrice_sexy.webp", type: "image" },
    { name: "beatrice_sexy_good.webm", type: "video" },
    { name: "beatrice_vole_carte.webm", type: "video" },
    { name: "beatrice_vole_carte2.webm", type: "video" },
    { name: "beatrice_vole_carte3.webm", type: "video" },
    { name: "boat_antartic.webm", type: "video" },
    { name: "charles_foret.webp", type: "image" },
    { name: "charles_run.webp", type: "image" },
    { name: "charles_walk.webm", type: "video" },
    { name: "clemence.webm", type: "video" },
    { name: "ef046e70-3216-4041-954d-1489529e3638.webm", type: "video" },
    { name: "grok-image-1501a5fa-77c8-453b-85f1-7c810bc3b977.webp", type: "image" },
    { name: "grok-image-4e97f32f-57ba-4c25-9bb5-bb68b43f7769.webp", type: "image" },
    { name: "grok-image-6f902406-d092-4aa2-bbc6-e2be03d47989.webp", type: "image" },
    { name: "grok-image-90149e5d-cc33-406d-aadc-a3b2aa67eb15.webp", type: "image" },
    { name: "grok-video-4e97f32f-57ba-4c25-9bb5-bb68b43f7769.webm", type: "video" },
    { name: "grok-video-6c837a0d-3c8b-4293-9e29-2e0f18ad4d49.webm", type: "video" },
    { name: "grok-video-94403946-71cc-4550-a118-fa164211ae9e.webm", type: "video" },
    { name: "grok-video-a626377b-78e7-4226-b423-aef05f033bfd.webm", type: "video" },
    { name: "grok-video-e50d8679-ea11-4b1f-8b01-07cf743e1b46.webm", type: "video" },
    { name: "heroes_arriving_antarctica.webp", type: "image" },
    { name: "idriss.webp", type: "image" },
    { name: "idriss_action.webp", type: "image" },
    { name: "idriss_base_1.webm", type: "video" },
    { name: "idriss_charles_key.webp", type: "image" },
    { name: "idriss_eglise.webp", type: "image" },
    { name: "idriss_librairie.webm", type: "video" },
    { name: "idriss_presentation_bis.webm", type: "video" },
    { name: "idrisseglise.webp", type: "image" },
    { name: "image.webp", type: "image" },
    { name: "lechoix_dans.webm", type: "video" },
    { name: "xorox.webp", type: "image" }
];

export const storyData = {
    summary: {
        title: "L’ARTEFACT DE VÉRITÉ",
        p1: "Inspiré du lore IS-BE, ce court-métrage révèle la Terre comme une Planète-Prison sous amnésie forcée depuis 30 000 ans. Un groupe de 8 héros modernes, mené par Nicolas Vidal et Clémence, découvre un Cristal millénaire capable de briser les chaînes de l'illusion mondiale imposées par XoroX et l'Ancien Empire.",
        p2: "Tout commence par la clé USB dorée de Roswell 1947, révélant la base cachée du Domaine en Himalaya. L'équipe doit assembler les fragments de l'Artefact pour réinitialiser la conscience humaine avant que XoroX et ses comploteurs ne verrouillent définitivement notre destin.",
        p3: "Entre combats contre des monstres insectoïdes et révélations sur les dinosaures atomisés il y a 70 millions d'années, l'union des huit devient l'ultime rempart. Une odyssée épique qui redéfinit notre place dans l'univers et les secrets du ciel."
    },
    acts: [
        {
            title: "ACTE I : L'ÉVEIL HIMALAYEN",
            content: "À 8500 av. J.-C., dans la base secrète du Domaine, les 8 héros activent les Portes IS-BE. Une explosion de lumière dorée révèle la création des galaxies par la pensée. Première confrontation brutale avec les Vortrax insectoïdes au bord d'un ravin abyssal.",
            prompts: [
                "Cinematic wide shot: 8 heroes in single file on a vertical Himalayan ridge at sunset. Teal and gold glowing ruins in the background. --ar 16:9",
                "Close-up: Nicolas and Clémence activating ancient stone IS-BE gates, blue and gold energy radiating. --v 6.0"
            ]
        },
        {
            title: "ACTE II : CHASSE ET CITÉS PERDUES",
            content: "Poursuite en Jeep dans la jungle amazonienne, suivie d'une plongée dans une cité atlante aux reflets bleu électrique. Idriss et André décodent le 2e fragment lié au Bataillon Perdu, traqués sans relâche par les drones de suppression de XoroX.",
            prompts: [
                "Underwater cinematic: Ancient Atlantean city with blue bioluminescent energy. Heroes swimming towards a glowing fragment. --ar 16:9",
                "Action shot: Mud-covered Jeep flying through dense jungle, chased by bio-mechanical insectoid drones. --ar 16:9"
            ]
        },
        {
            title: "ACTE III : LE SECRET DE ROSWELL",
            content: "Infiltration d'un bunker en 1947. L'hologramme d'Airl révèle la vérité sur Matilda et la Planète-Prison. Combat intense dans les couloirs du bunker contre les commandos comploteurs menés par le Dr Rudy et Julien Shadow.",
            prompts: [
                "Historic bunker interior 1947. A glowing holographic alien (Airl) floating before Matilda and the heroes. High contrast cinematic lighting. --ar 16:9",
                "Close combat: Heroes fighting technocratic guards in a retro-futuristic bunker corridor. --v 6.0"
            ]
        },
        {
            title: "ACTE IV : BASE ANTARCTIQUE",
            content: "Dans les profondeurs glaciaires, l'Artefact complet s'assemble. Combat final à 360° : les chiens Nala et Zorz percutent les monstres Skritch en slow-motion. Charles et André affrontent le Dr Rudy possédé par l'énergie de XoroX.",
            prompts: [
                "Epic battle in an Antarctic ice base. Glowing artifact floating in the center. Explosions and debris in zero-gravity style. --ar 16:9",
                "Heroic duo: Nala the dog jumping at a bio-mechanical monster mid-air, sparks and cyber-parts flying. --ar 16:9"
            ]
        },
        {
            title: "ACTE V : ACTIVATION MONDIALE",
            content: "Nicolas active le cristal final. XoroX est dissous par une vague de lumière dorée qui parcourt la Terre. Les IS-BE se souviennent. Les héros voient la Terre depuis l'espace, libérée, avec un teaser pointant vers les mystères de l'Égypte.",
            prompts: [
                "Global revelation: A wave of golden energy washing over the Earth's atmosphere, breaking teal digital grids. --ar 16:9",
                "Grand finale: 8 heroes standing together, looking at the sunrise over the planet. Teaser text floating in the clouds. --v 6.0"
            ]
        }
    ],
    promptLibrary: {
        images: [
            "Rendu Global: 3D complète avec un look cel-shaded / comic-book très marqué, lignes de contour noires ou colorées dynamiques, ombres et lumières stylisées, contrastes forts, aplats de couleurs vives.",
            "Design Héros: Style 'héros modernes 2026', vêtements actuels mais stylisés (vestes tactiques, hoodies high-tech, boots d’aventurier), visages expressifs très BD avec grands yeux et cheveux volumineux.",
            "Design XoroX: Silhouette élancée, cape high-tech noire et violet sombre, masque futuriste cachant son visage, aura violette qui pulse.",
            "Décors Épiques: Jungles luxuriantes aux couleurs saturées, temples millénaires couverts de runes luminescentes, montagnes himalayennes, bases secrètes sous-marines.",
            "Éclairage Cinématographique: Rayons de soleil perçant la canopée, ambiance dramatique 'Indiana Jones + Blade Runner', tons chauds et contrastés (ocre, émeraude, violet électrique, or ancien)."
        ],
        videos: [
            {
                title: "Apparition de XoroX",
                prompt: "Cinematic medium shot, a towering villain in a high-tech black and dark purple cape with a glowing futuristic mask materializes from digital shadows. Violent teal and purple electrical arcs pulse around him. 3D cel-shaded animation style, dramatic comic-book lighting, intense glowing eyes, slow and menacing movement. --ar 16:9 --v 6.0",
                image: "/assets/persos_de_reference/Xorox/XOROX_GOOD.jpg"
            },
            {
                title: "Évasion Souterraine",
                prompt: "Fast-paced action tracking shot. Beautiful blonde spy in teal tactical gear sliding elegantly under a closing blast door in a pristine white futuristic corridor. Red emergency alarms flashing, kinetic motion blur, highly stylized 3D cel-shaded rendering, comic-book ink outlines. --ar 16:9 --v 6.0",
                image: "/assets/Scenes_action/beatrice_clemence_serveurs.webp"
            },
            {
                title: "L'Anomalie Épineuse",
                prompt: "Extreme close up, macro shot. A bio-mechanical white insectoid creature with sharp black spines unfurls its limbs with sinister precision. It blends into a rocky canyon background. Glowing teal energy flows through its artificial veins. Highly detailed 3D illustration, dynamic lighting, cel-shaded texture. --ar 16:9 --v 6.0",
                image: "/assets/persos_de_reference/creatures/insecte/insecte_blanc.webp"
            },
            {
                title: "Le Dôme Antarctique",
                prompt: "Epic establishing wide shot. An ancient, massive high-tech fortress embedded in a frozen Himalayan glacial cliff. A glowing teal shield dome hums with energy against a dark, stormy sky. Two small adventurers holding glowing torches look up at the structure. 3D animated style, vibrant contrast, hyper-detailed environment. --ar 16:9 --v 6.0",
                image: "/assets/Scenes_action/dome_atlantide.webp"
            },
            {
                title: "Infiltration Numérique",
                prompt: "Dutch angle dynamic shot. A stealthy hacker in dark streetwear crouches on a wet neon-lit cyberpunk rooftop. Rain falling, reflecting bright teal and gold city lights. Holographic interfaces floating around his arm. Smooth 60fps animation, 3D cel-shaded comic style, intense atmosphere. --ar 16:9 --v 6.0",
                image: "/assets/Scenes_action/abtf_new_york_street.webp"
            }
        ]
    }
};
