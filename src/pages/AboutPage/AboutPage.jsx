import React, { useEffect } from 'react'
import styles from './AboutPage.module.css'
import arrow from '../../assets/images/About/about_arrow.svg'
import image1 from '../../assets/images/About/about_image1.jpg'
import girl from '../../assets/images/About/3d_girl.png'
import image2 from '../../assets/images/About/about_image2.png'
import logos from '../../assets/images/About/logos.png'
import coins from '../../assets/images/About/coins.png'
function AboutPage()
{
    useEffect(() =>
    {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className={styles.aboutPage}>
            <div className={styles.container}>
                <h2>О нас</h2>
                <div className={styles.block_1}>
                    <div className={styles.block_1_left}>
                        <p>Мы - команда экспертов в сфере технологий, объединенных одной страстью - помогать людям в их техническом росте. Geeks Mentor создан для того, чтобы предоставить вам уникальную возможность найти своего идеального ментора, который поможет вам в обретении навыков и достижении ваших целей в технологической индустрии.</p>
                        <img src={arrow} alt="img" />
                    </div>
                    <div className={styles.block_1_right}>
                        <img src={image1} alt="img" />
                    </div>
                </div>
                <div className={styles.block_2}>
                    <div className={styles.block_2_left}>
                        <img src={image2} alt="img" />
                    </div>
                    <div className={styles.block_2_right}>
                        <h3>Что делает Geeks Mentor особенным?</h3>
                        <p>Мы стремимся предоставить вам доступ к самым талантливым и опытным профессионалам в различных областях технологий. Наша команда тщательно подбирает менторов, учитывая их опыт, знания и профессиональные достижения. Мы обеспечиваем высокое качество наших менторских программ, чтобы удовлетворить потребности самых требовательных студентов и профессионалов.</p>
                    </div>
                </div>
                <div className={styles.arrow}><img src={arrow} alt="img" /></div>
                <div className={styles.block_1}>
                    <div className={styles.block_1_left}>
                        <p>У нас вы найдете менторов, которые владеют широким спектром навыков, включая программирование, веб-разработку, базы данных, UX/UI дизайн и многое другое. Независимо от вашего уровня знаний, мы поможем вам найти ментора, который подстроится под ваши потребности и поможет вам развиваться в соответствии с вашими целями.</p>
                    </div>
                    <div className={styles.block_1_right}>
                        <img src={logos} alt="img" className={styles.logos} />
                    </div>
                </div>
                <div className={styles.block_3}>
                    <div className={styles.list}>
                        <h3>Правила поведения менторов</h3>
                        <ul>
                            <li>Ментор должен приходить на собрания менторов и на другие соответствующие мероприятия (Мастер классы, Demo Days, Last Sunday)</li>
                            <li>Ментор должен помогать ученикам, если у него есть возможность</li>
                            <li>Ментор не должен отбирать гиккоины у ученика без его согласия</li>
                            <li>Ментор должен обладать высоким уровнем soft и hard скиллов.Также в менторстве должны присутствовать такие качества,как ответственность,доброжелательность и умение обучать</li>
                        </ul>
                    </div>
                    <div className={styles.list}>
                        <h3>Правила поведения учеников</h3>
                        <ul>
                            <li>Ученик должен вежливо обращаться к ментору</li>
                            <li>Ученик не должен тревожить ментора в ночное время суток</li>
                            <li>Ученик должен отдать гиккоин, если считает что ментор помог достаточно</li>
                            <li>Ученик не должен сидеть за столом старших менторов</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.block_4}>
                    <h3>Что такое GeekCoin?</h3>
                    <div className={styles.block_4_inner}>
                        <img src={coins} alt="img" />
                        <p>GeekCoin - это внутренняя валюта, эквивалентом от 150 до 350 сом</p>
                    </div>
                </div>
                <div className={styles.block_1}>
                    <div className={styles.block_1_left}>
                        <p>Каждому студенту выдаётся 4 GeekCoin, которые они могут обменять на помощь в домашних работах от менторов(студентов более старших курсов)</p>
                        <p>Тем самым студенты, которые не успевают с домашними работами получают помощь от более опытного ментора(студента более старшего курса), а менторы повторяют пройденный материал ещё раз, закрепляя его на практике</p>
                    </div>
                    <div className={styles.block_1_right}>
                        <img src={girl} alt="img" className={styles.logos} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage
