document.addEventListener('DOMContentLoaded', function() {

    // Objeto com as palavras para a animação de digitação do "hero"
    const textArrays = {
        pt: ["Java", "Javascript", "Typescript", "SQL", "PHP", "C", "Python", "Ruby", "VHDL", "Spring", "JPA", "JUnit", "Mockito", "React", "Angular", "Software Embarcado"],
        en: ["Java", "Javascript", "Typescript", "SQL", "PHP", "C", "Python", "Ruby", "VHDL", "Spring", "JPA", "JUnit", "Mockito", "React", "Angular", "Embedded Software"],
        es: ["Java", "Javascript", "Typescript", "SQL", "PHP", "C", "Python", "Ruby", "VHDL", "Spring", "JPA", "JUnit", "Mockito", "React", "Angular", "Software Embebido"],
        fr: ["Java", "Javascript", "Typescript", "SQL", "PHP", "C", "Python", "Ruby", "VHDL", "Spring", "JPA", "JUnit", "Mockito", "React", "Angular", "Logiciel Embarqué"],
        ja: ["Java", "Javascript", "Typescript", "SQL", "PHP", "C", "Python", "Ruby", "VHDL", "Spring", "JPA", "JUnit", "Mockito", "React", "Angular", "組込みソフトウェア"],
        zh: ["Java", "Javascript", "Typescript", "SQL", "PHP", "C", "Python", "Ruby", "VHDL", "Spring", "JPA", "JUnit", "Mockito", "React", "Angular", "嵌入式软件"]
    };

    // Objeto com os dados para a animação da seção de competências
    const skillsDataByLang = {
        en: { "Languages": ["Java (Advanced)", "Javascript/Typescript (Intermediate)", "SQL (Intermediate)", "PHP (Intermediate)", "C Language (Intermediate)", "Python (Basic)", "Ruby (Basic)", "VHDL (Basic)"], "Frameworks & Ecosystem": ["Spring (Advanced)", "JPA", "JUnit, Mockito (Intermediate)", "React (Intermediate)", "Angular (Basic)"], "Tools & Platforms": ["Git, Bitbucket, Azure Repos, GitHub, SVN", "Gradle, Maven, Jira, Azure DevOps", "Oracle PL/SQL, MS SQL Server, MongoDB"], "Methodologies & Practices": ["Agile Methodologies", "Clean Code", "Requirements Specification"] },
        pt: { "Linguagens": ["Java (Avançado)", "Javascript/Typescript (Intermediário)", "SQL (Intermediário)", "PHP (Intermediário)", "Linguagem C (Intermediário)", "Python (Básico)", "Ruby (Básico)", "VHDL (Básico)"], "Frameworks & Ecossistema": ["Spring (Avançado)", "JPA", "JUnit, Mockito (Intermediário)", "React (Intermediário)", "Angular (Básico)"], "Ferramentas & Plataformas": ["Git, Bitbucket, Azure Repos, GitHub, SVN", "Gradle, Maven, Jira, Azure DevOps", "Oracle PL/SQL, MS SQL Server, MongoDB"], "Metodologias & Práticas": ["Metodologias Ágeis", "Clean Code", "Especificação de Requisitos"] },
        es: { "Lenguajes": ["Java (Avanzado)", "Javascript/Typescript (Intermedio)", "SQL (Intermedio)", "PHP (Intermedio)", "Lenguaje C (Intermedio)", "Python (Básico)", "Ruby (Básico)", "VHDL (Básico)"], "Frameworks & Ecosistema": ["Spring (Avanzado)", "JPA", "JUnit, Mockito (Intermedio)", "React (Intermedio)", "Angular (Básico)"], "Herramientas & Plataformas": ["Git, Bitbucket, Azure Repos, GitHub, SVN", "Gradle, Maven, Jira, Azure DevOps", "Oracle PL/SQL, MS SQL Server, MongoDB"], "Metodologías & Prácticas": ["Metodologías Ágiles", "Clean Code", "Especificación de Requisitos"] },
        fr: { "Langages": ["Java (Avancé)", "Javascript/Typescript (Intermédiaire)", "SQL (Intermédiaire)", "PHP (Intermédiaire)", "Langage C (Intermédiaire)", "Python (Basique)", "Ruby (Basique)", "VHDL (Basique)"], "Frameworks & Écosystème": ["Spring (Avancé)", "JPA", "JUnit, Mockito (Intermédiaire)", "React (Intermédiaire)", "Angular (Basique)"], "Outils & Plateformes": ["Git, Bitbucket, Azure Repos, GitHub, SVN", "Gradle, Maven, Jira, Azure DevOps", "Oracle PL/SQL, MS SQL Server, MongoDB"], "Méthodologies & Pratiques": ["Méthodologies Agiles", "Clean Code", "Spécification des Exigences"] },
        ja: { "言語": ["Java (上級)", "Javascript/Typescript (中級)", "SQL (中級)", "PHP (中級)", "C言語 (中級)", "Python (初級)", "Ruby (初級)", "VHDL (初級)"], "フレームワークとエコシステム": ["Spring (上級)", "JPA", "JUnit, Mockito (中級)", "React (中級)", "Angular (初級)"], "ツールとプラットフォーム": ["Git, Bitbucket, Azure Repos, GitHub, SVN", "Gradle, Maven, Jira, Azure DevOps", "Oracle PL/SQL, MS SQL Server, MongoDB"], "方法論と実践": ["アジャイル方法論", "クリーンコード", "要件定義"] },
        zh: { "语言": ["Java (高级)", "Javascript/Typescript (中级)", "SQL (中级)", "PHP (中级)", "C语言 (中级)", "Python (初级)", "Ruby (初级)", "VHDL (初级)"], "框架与生态系统": ["Spring (高级)", "JPA", "JUnit, Mockito (中级)", "React (中级)", "Angular (初级)"], "工具与平台": ["Git, Bitbucket, Azure Repos, GitHub, SVN", "Gradle, Maven, Jira, Azure DevOps", "Oracle PL/SQL, MS SQL Server, MongoDB"], "方法论与实践": ["敏捷方法论", "整洁代码", "需求规格说明"] }
    };
    
    // --- LÓGICA GERAL ---
    const currentLang = document.documentElement.lang || 'pt'; // Detecta o idioma da tag <html lang="">

    // --- ANIMAÇÃO DE DIGITAÇÃO (HERO) ---
    let typeTimeout, eraseTimeout;
    let textArrayIndex = 0;
    let charIndex = 0;
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".typing-cursor");

    function type() {
        if (!typedTextSpan || !cursorSpan) return;
        const currentTextArray = textArrays[currentLang] || textArrays['pt'];
        if (charIndex < currentTextArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += currentTextArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            typeTimeout = setTimeout(type, 100);
        } else {
            cursorSpan.classList.remove("typing");
            eraseTimeout = setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (!typedTextSpan || !cursorSpan) return;
        const currentTextArray = textArrays[currentLang] || textArrays['pt'];
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = currentTextArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            eraseTimeout = setTimeout(erase, 50);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= currentTextArray.length) textArrayIndex = 0;
            typeTimeout = setTimeout(type, 1100);
        }
    }
    
    // --- ANIMAÇÃO DE COMPETÊNCIAS (DECODER) ---
    let skillObserver;
    let skillAnimationController = new AbortController();

    function skillsDecoder(lang) {
        const container = document.getElementById("skills-decoder");
        const skillsData = skillsDataByLang[lang] || skillsDataByLang['pt'];

        if (!container || !skillsData) return;

        // Limpa o conteúdo estático se o JS estiver habilitado
        container.innerHTML = ""; 

        skillAnimationController.abort();
        skillAnimationController = new AbortController();
        const signal = skillAnimationController.signal;

        if (skillObserver) skillObserver.disconnect();

        let hasBeenActivated = false;

        async function typeLine(element, text, speed = 50) {
            return new Promise(resolve => {
                let i = 0;
                element.innerHTML = '';
                const cursor = document.createElement('span');
                cursor.className = 'decoding-cursor';
                function typing() {
                    if (signal.aborted) return;
                    if (i < text.length) {
                        element.innerHTML = text.substring(0, i + 1);
                        element.appendChild(cursor);
                        i++;
                        setTimeout(typing, speed);
                    } else {
                        element.innerHTML = text;
                        resolve();
                    }
                }
                typing();
            });
        }

        async function decodeCategories() {
            const categories = Object.keys(skillsData);
            for (const categoryName of categories) {
                if (signal.aborted) return;
                const skillsList = skillsData[categoryName];
                const categoryContainer = document.createElement('div');
                categoryContainer.className = 'skills-category-decoder';
                const titleElement = document.createElement('h3');
                const listElement = document.createElement('ul');
                container.appendChild(categoryContainer);
                categoryContainer.appendChild(titleElement);
                categoryContainer.appendChild(listElement);
                await typeLine(titleElement, categoryName, 40);
                for (const skill of skillsList) {
                    if (signal.aborted) return;
                    const listItem = document.createElement('li');
                    listElement.appendChild(listItem);
                    await typeLine(listItem, skill, 20);
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        }

        skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasBeenActivated) {
                    hasBeenActivated = true;
                    decodeCategories();
                }
            });
        }, { threshold: 0.5 });
        skillObserver.observe(container);
    }
    
    // --- LÓGICA DE REVELAR AO ROLAR ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(elem => revealObserver.observe(elem));

    // --- LÓGICA DO FAVICON ANIMADO ---
    const faviconLink = document.getElementById('favicon');
    const favicons = [
        'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22><path fill=%22none%22 stroke=%22%2300ff41%22 stroke-width=%222%22 d=%22M1 8 C1 8 5 2 8 2 C11 2 15 8 15 8 C15 8 11 14 8 14 C5 14 1 8 1 8z%22 /><circle cx=%228%22 cy=%228%22 r=%222%22 fill=%22%2300ff41%22/></svg>',
        'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22><rect width=%2216%22 height=%224%22 y=%226%22 fill=%22%2300ff41%22/></svg>'
    ];
    let faviconIndex = 0;
    setInterval(() => {
        if (faviconLink) {
            faviconLink.href = favicons[faviconIndex];
            faviconIndex = (faviconIndex + 1) % favicons.length;
        }
    }, 2000);

    // --- INICIA AS ANIMAÇÕES QUANDO A PÁGINA CARREGA ---
    type();
    skillsDecoder(currentLang);
});