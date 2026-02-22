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
};

export const heroesData: Character[] = [
    {
        name: "Nicolas Vidal", role: "Leader Charismatique", cat: "hros",
        inspiration: "Leader charismatique, archéologue/hacker, veste marron et sac à dos, regard déterminé.",
        realLife: {
            occ: "Journaliste & Fondateur de Putsch",
            fact: "Spécialiste de la critique média et des libertés.",
            power: "Capacité à fédérer les voix dissidentes."
        },
        img: "/assets/persos_de_reference/version_classe_hero/nicolas.png",
        classe: "/assets/persos_de_reference/version_classe_hero/nicolas.png",
        model: "/assets/persos_de_reference/Model_sheet_heros/nicolas.png",
        portrait: "/assets/persos_de_reference/portraits_heros/nicolasclean.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/nicolas.webm"
    },
    {
        name: "Clémence", role: "Reporter Intrépide", cat: "hros",
        inspiration: "Reporter intrépide, cheveux bouclés roux, chemise bleu foncé, toujours prête à foncer en première ligne.",
        realLife: {
            occ: "Journaliste chez Tocsin",
            fact: "Reporter de terrain infatigable.",
            power: "Courage face aux menaces."
        },
        img: "/assets/persos_de_reference/version_classe_hero/clemence.jpg",
        classe: "/assets/persos_de_reference/version_classe_hero/clemence.jpg",
        model: "/assets/persos_de_reference/Model_sheet_heros/clemence.jpg",
        portrait: "/assets/persos_de_reference/portraits_heros/clemenceclean.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/clemence.webm"
    },
    {
        name: "Idriss Aberkane", role: "Génie Scientifique", cat: "hros",
        inspiration: "Génie scientifique excentrique, veste camouflage, maîtrise la tech et les pièges anciens.",
        realLife: {
            occ: "Chercheur & Conférencier",
            fact: "Expert en neurosciences et biomimétisme.",
            power: "Intelligence stratégique hors norme."
        },
        img: "/assets/persos_de_reference/version_classe_hero/idriss.jpg",
        classe: "/assets/persos_de_reference/version_classe_hero/idriss.jpg",
        model: "/assets/persos_de_reference/Model_sheet_heros/idriss.png",
        portrait: "/assets/persos_de_reference/portraits_heros/idrissclean.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/idriss.webm"
    },
    {
        name: "André Bercoff", role: "Mentor Sage", cat: "hros",
        inspiration: "Mentor sage et historien, chauve avec lunettes, voix grave, connaît tous les secrets oubliés.",
        realLife: {
            occ: "Journaliste & Animateur Radio",
            fact: "Voix iconique de Sud Radio.",
            power: "Capacité à galvaniser l'opinion publique."
        },
        img: "/assets/persos_de_reference/version_classe_hero/andre.png",
        classe: "/assets/persos_de_reference/version_classe_hero/andre.png",
        model: "/assets/persos_de_reference/Model_sheet_heros/andre.png",
        portrait: "/assets/persos_de_reference/portraits_heros/andreclean.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/Andre.webm"
    },
    {
        name: "Béatrice Rosen", role: "Stratège Glamour", cat: "hros",
        inspiration: "Stratège glamour et combative, chemise bleue, pose assurée, utilise son charisme pour désamorcer les situations.",
        realLife: {
            occ: "Actrice & Productrice",
            fact: "Star internationale, activiste pour la vérité.",
            power: "Influence médiatique et charisme naturel."
        },
        img: "/assets/persos_de_reference/version_classe_hero/beatrice.jpg",
        classe: "/assets/persos_de_reference/version_classe_hero/beatrice.jpg",
        model: "/assets/persos_de_reference/Model_sheet_heros/beatrice.png",
        portrait: "/assets/persos_de_reference/portraits_heros/batriceclean.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/beatrice.webm"
    },
    {
        name: "AubonTweet", role: "Expert Infiltration", cat: "hros",
        inspiration: "Mystérieux et discret, expert en infiltration, toujours calme sous pression.",
        realLife: {
            occ: "Vigie Méditique & Analyste",
            fact: "Spécialiste de l'analyse des courants d'opinion numérique.",
            power: "Capacité d'infiltration et de décryptage réseau."
        },
        img: "/assets/persos_de_reference/version_classe_hero/abtf.jpg",
        classe: "/assets/persos_de_reference/version_classe_hero/abtf.jpg",
        model: "/assets/persos_de_reference/Model_sheet_heros/abtf.png",
        portrait: "/assets/persos_de_reference/portraits_heros/abtfclean.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/abtf.webm"
    },
    {
        name: "Alexis Poulin", role: "Analyste & Pilote", cat: "hros",
        inspiration: "Analyste géopolitique et pilote, gère les véhicules et les stratégies macro.",
        realLife: {
            occ: "Analyste Politique & Stratège",
            fact: "Expert en décryptage des stratégies de pouvoir.",
            power: "Analyse prédictive et anticipation."
        },
        img: "/assets/persos_de_reference/version_classe_hero/alexis.jpg",
        classe: "/assets/persos_de_reference/version_classe_hero/alexis.jpg",
        model: "/assets/persos_de_reference/Model_sheet_heros/alexis.png",
        portrait: "/assets/persos_de_reference/portraits_heros/alexisclean.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/Alexis.webm"
    },
    {
        name: "Charles Alloncle", role: "Aventurier Politique", cat: "hros",
        inspiration: "Aventurier politique, force morale du groupe, motivant tout le monde dans les moments critiques.",
        realLife: {
            occ: "Homme Politique (Député)",
            fact: "Défenseur acharné de la souveraineté.",
            power: "Leadership naturel et force de conviction."
        },
        img: "/assets/persos_de_reference/version_classe_hero/Charles.jpg",
        classe: "/assets/persos_de_reference/version_classe_hero/Charles.jpg",
        model: "/assets/persos_de_reference/Model_sheet_heros/charles.png",
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
        img: "/assets/persos_de_reference/version_classe_hero/rudy.png",
        classe: "/assets/persos_de_reference/version_classe_hero/rudy.png",
        model: "/assets/persos_de_reference/comploteurs/rudy.png",
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
        img: "/assets/persos_de_reference/version_classe_hero/julien.png",
        classe: "/assets/persos_de_reference/version_classe_hero/julien.png",
        model: "/assets/persos_de_reference/comploteurs/julien_classe.png",
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
        img: "/assets/persos_de_reference/version_classe_hero/tristan.png",
        classe: "/assets/persos_de_reference/version_classe_hero/tristan.png",
        model: "/assets/persos_de_reference/comploteurs/tristan.png",
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
        img: "/assets/persos_de_reference/XoroX/XOROX_GOOD.jpg",
        video: "/assets/persos_de_reference/heros_presentation_video/xorox.webm"
    }
];

export const sceneBrowserData = [
    { title: "Infiltration New York", media: "abtf_new_york_street.png", type: "image", desc: "AubonTweet repère les sentinelles dans les rues dithered." },
    { title: "Brèche Antarctique", media: "boat_antartic.webm", type: "video", desc: "L'approche finale du noyau par la mer de glace." },
    { title: "Complot des 3", media: "3_comploteurs.png", type: "image", desc: "Le triumvirat de l'ombre discute de la censure globale." },
    { title: "Évasion Souterraine", media: "beatrice_entrepot_fuite.webm", type: "video", desc: "Béatrice échappe in extremis aux gardes de XoroX." }
];

export const mediaFiles = [
    { name: "3_comploteurs.png", type: "image" },
    { name: "3_comploteurs2.png", type: "image" },
    { name: "abtf.webm", type: "video" },
    { name: "abtf_clem_stop_interview.webm", type: "video" },
    { name: "abtf_clemence_alien_ville.webm", type: "video" },
    { name: "abtf_new_york_street.png", type: "image" },
    { name: "abtf_walk.webm", type: "video" },
    { name: "alexis.webm", type: "video" },
    { name: "alexis_alien.png", type: "image" },
    { name: "alexis_et_andre.png", type: "image" },
    { name: "alexis_et_andre_good.png", type: "image" },
    { name: "alexis_nicolas_entree_grotte.webm", type: "video" },
    { name: "alie2earth.png", type: "image" },
    { name: "alien2.jpeg", type: "image" },
    { name: "andre_avion.webm", type: "video" },
    { name: "andre_avion2.webm", type: "video" },
    { name: "andre_avion3.webm", type: "video" },
    { name: "andre_charles_chateau.png", type: "image" },
    { name: "andre_pilote.png", type: "image" },
    { name: "andre_pose_antartique.webm", type: "video" },
    { name: "bea_conspi.webm", type: "video" },
    { name: "bea_flatteuse.webm", type: "video" },
    { name: "bea_idriss_train.webm", type: "video" },
    { name: "beat.webm", type: "video" },
    { name: "beat_charles.png", type: "image" },
    { name: "beat_comploteurs.png", type: "image" },
    { name: "beat_vol.webm", type: "video" },
    { name: "beatrice_clemence_serveurs.png", type: "image" },
    { name: "beatrice_entrepot_fuite.webm", type: "video" },
    { name: "beatrice_karate.webm", type: "video" },
    { name: "beatrice_sexy.webm", type: "video" },
    { name: "beatrice_sexy.png", type: "image" },
    { name: "beatrice_sexy_good.webm", type: "video" },
    { name: "beatrice_vole_carte.webm", type: "video" },
    { name: "beatrice_vole_carte2.webm", type: "video" },
    { name: "beatrice_vole_carte3.webm", type: "video" },
    { name: "boat_antartic.webm", type: "video" },
    { name: "charles_foret.png", type: "image" },
    { name: "charles_run.jpg", type: "image" },
    { name: "charles_walk.webm", type: "video" },
    { name: "clemence.webm", type: "video" },
    { name: "ef046e70-3216-4041-954d-1489529e3638.webm", type: "video" },
    { name: "grok-image-1501a5fa-77c8-453b-85f1-7c810bc3b977.png", type: "image" },
    { name: "grok-image-4e97f32f-57ba-4c25-9bb5-bb68b43f7769.png", type: "image" },
    { name: "grok-image-6f902406-d092-4aa2-bbc6-e2be03d47989.png", type: "image" },
    { name: "grok-image-90149e5d-cc33-406d-aadc-a3b2aa67eb15.png", type: "image" },
    { name: "grok-video-4e97f32f-57ba-4c25-9bb5-bb68b43f7769.webm", type: "video" },
    { name: "grok-video-6c837a0d-3c8b-4293-9e29-2e0f18ad4d49.webm", type: "video" },
    { name: "grok-video-94403946-71cc-4550-a118-fa164211ae9e.webm", type: "video" },
    { name: "grok-video-a626377b-78e7-4226-b423-aef05f033bfd.webm", type: "video" },
    { name: "grok-video-e50d8679-ea11-4b1f-8b01-07cf743e1b46.webm", type: "video" },
    { name: "heroes_arriving_antarctica.png", type: "image" },
    { name: "idriss.webp", type: "image" },
    { name: "idriss_action.png", type: "image" },
    { name: "idriss_base_1.webm", type: "video" },
    { name: "idriss_charles_key.jpeg", type: "image" },
    { name: "idriss_eglise.jpg", type: "image" },
    { name: "idriss_librairie.webm", type: "video" },
    { name: "idriss_presentation_bis.webm", type: "video" },
    { name: "idrisseglise.png", type: "image" },
    { name: "image.jpg", type: "image" },
    { name: "image.png", type: "image" },
    { name: "lechoix_dans.webm", type: "video" },
    { name: "xorox.jpg", type: "image" }
];

export const storyData = {
    summary: {
        title: "L’ARTEFACT DE VÉRITÉ",
        p1: "Un court-métrage haletant inspiré des épopées d'aventure les plus épiques. Entre archéologie interdite et technologie du futur, une équipe de 8 héros déterminés — incluant le hacker Nicolas Vidal, la reporter Clémence, et le sage André Bercoff — doit s'emparer d'un Artefact millénaire pour briser les chaînes de l'illusion mondiale et révéler la sinistre vérité derrière la Planète-Prison.",
        p2: "Tout commence par la découverte d'une clé USB dorée issue du crash de Roswell, contenant une carte holographique vers une base secrète enfouie sous les neiges éternelles de l'Himalaya. C’est une course contre la montre désespérée pour activer le cristal d'Airl avant que XoroX et ses comploteurs ne verrouillent définitivement notre destin.",
        p3: "Face aux drones de suppression et aux illusions holographiques de l'Ancien Empire, l'union des huit deviendra leur seule arme. Une révélation finale qui changera à jamais notre regard sur le ciel et les piliers de notre civilisation."
    },
    acts: [
        {
            title: "ACTE I : RÉUNION SECRÈTE (PARIS)",
            content: "Dans un entrepôt clandestin à Paris, Nicolas Vidal convoque l'équipe. Il branche la clé USB de Roswell : une carte holographique de la base Himalaya (6500 av. J.-C.) surgit. André Bercoff explique en voix off la timeline : IS-BE, Ancien Empire, Bataillon Perdu. XoroX est déjà en route.",
            prompts: [
                "Cinematic interior, Paris warehouse at night. Nicolas Vidal standing before a glowing teal holographic 3D map of the Himalayas. The 8 heroes gathered around. High contrast, film noir vibes. --ar 16:9",
                "Close-up: A glowing gold USB key (Roswell symbol) being inserted into a glitched terminal. --v 6.0"
            ]
        },
        {
            title: "ACTE II : POURSUITE & HIMALAYA",
            content: "Alexis Poulin pilote l'avion cargo. Des drones de XoroX attaquent, provoquant un crash dans les neiges éternelles. L'équipe escalade des falaises, traverse des ponts de glace qui s'effondrent sous une avalanche. Clémence et Idriss sauvent le groupe. AubonTweet repère l'entrée secrète.",
            prompts: [
                "Action sequence: Cargo plane burning over snowy mountain peaks, pursued by swarm of teal-eyed drones. --ar 16:9",
                "Extreme wide shot: 8 heroes climbing a vertical ice cliff, massive avalanche cascading in background. Cinematic scale. --ar 16:9"
            ]
        },
        {
            title: "ACTE III : LA BASE DU DOMAINE",
            content: "L'intérieur est grandiose. Des couloirs illuminés par des cristaux anciens et des grilles de force de l'Ancien Empire. Des dinosaures atomiques holographiques prennent vie. Scène culte : course au bord d'un ravin, Béatrice Rosen fait un saut héroïque pour rattraper Charles Alloncle au-dessus du vide.",
            prompts: [
                "Grand ancient base interior, glowing giant crystals. A holographic Atomic Dinosaur (luminous blue energy) roaring in a high-tech hallway. --ar 16:9",
                "Heroic slow motion: Béatrice Rosen jumping across a massive canyon to catch Charles Alloncle's hand. Cinematic lighting. --v 6.0"
            ]
        },
        {
            title: "ACTE IV : CONFRONTATION FINALE",
            content: "Salle de l'Artefact. XoroX sur son trône holographique. Combat épique : Idriss désactive les grilles, Clémence et Béatrice coordonnent les assauts. Nicolas affronte XoroX au duel (fouet improvsé vs énergie sombre). André hurle la vérité sur la planète-prison pour affaiblir XoroX.",
            prompts: [
                "Epic combat: Nicolas Vidal wielding an improvised whip wrapped in code-energy against a giant shadowy XoroX. Dark blue vs teal light. --ar 16:9",
                "Portrait: André Bercoff yelling defiantly, his words appearing as gold binary code breaking through teal energy walls. --v 6.0"
            ]
        },
        {
            title: "ACTE V : ACTIVATION & RÉVÉLATION",
            content: "Nicolas active le cristal. Voix d'Airl + montage rapide de la timeline (Roswell, Dinosaures, Bataillon Perdu). XoroX disparaît dans un portail. Les héros sortent au sommet des cimes au lever du soleil, déterminés... mais un drone les observe au loin.",
            prompts: [
                "Blinding gold light from an ancient crystal artifact, reflecting in Nicolas's eyes. Montage overlays of atom clouds and prehistoric ruins. --ar 16:9",
                "Wide shot: 8 heroes standing on a snowy Himalayan peak at sunrise. Small shadow of a drone watching from the clouds. End title 'XORO X RISING'. --ar 16:9"
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
                image: "/assets/Scenes_action/beatrice_clemence_serveurs.png"
            },
            {
                title: "L'Anomalie Épineuse",
                prompt: "Extreme close up, macro shot. A bio-mechanical white insectoid creature with sharp black spines unfurls its limbs with sinister precision. It blends into a rocky canyon background. Glowing teal energy flows through its artificial veins. Highly detailed 3D illustration, dynamic lighting, cel-shaded texture. --ar 16:9 --v 6.0",
                image: "/assets/persos_de_reference/creatures/insecte/insecte_blanc.png"
            },
            {
                title: "Le Dôme Antarctique",
                prompt: "Epic establishing wide shot. An ancient, massive high-tech fortress embedded in a frozen Himalayan glacial cliff. A glowing teal shield dome hums with energy against a dark, stormy sky. Two small adventurers holding glowing torches look up at the structure. 3D animated style, vibrant contrast, hyper-detailed environment. --ar 16:9 --v 6.0",
                image: "/assets/Scenes_action/dome_atlantide.png"
            },
            {
                title: "Infiltration Numérique",
                prompt: "Dutch angle dynamic shot. A stealthy hacker in dark streetwear crouches on a wet neon-lit cyberpunk rooftop. Rain falling, reflecting bright teal and gold city lights. Holographic interfaces floating around his arm. Smooth 60fps animation, 3D cel-shaded comic style, intense atmosphere. --ar 16:9 --v 6.0",
                image: "/assets/Scenes_action/abtf_new_york_street.png"
            }
        ]
    }
};
