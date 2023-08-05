import React, { useEffect, useState } from 'react'
import SwipperSlider from "../../components/SwipperSlider/SwipperSlider.jsx";
import Programs from "../../components/Programs/Programs.jsx";
import styles from './mentorsPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import FilteredPage from './components/FilteredPage/FilteredPage.jsx';
import { getMentors } from '../../redux/slices/mentorsSlice'
import mentorApi from '../../api/mentorApi'
import { searchMentor } from '../../redux/slices/filterSlice'
import SkilsFiltered from './components/SkilsFiltered/SkilsFiltered.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';

function MentorsPage()
{
    const programs = [
        { id: 1, name: 'Figma', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZ8UeF5-2kge6xWZY2LtlUph883mvHNhY1nr9fW-yT8J0m6RDgeo39CuMrtBA8TxBFcE2qZ3rQX09VaqHiGzuwyxqFgwF7mAIGZp-Y_2J6xH8drxaZSp9y0FvNAeEe5jnlNKTUrc818VvGb6HxshBbSBzqYyglIHVcayTLd2Y3ah0d2KWVj4ditExu/s1600/logos_figma%20(1).png', type: 'UX/UI Дизайн' },
        { id: 2, name: 'JavaScript', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgc9jgWmwHznDgE-lQC5JBoxOezcw4QVKKQQfjD1Boqv0PY2kpxwhFqrxvmVUtasofBazOhY4TZTBJKy03bPTgoWIKYbIku0erKmuMyUkeO7Hp0nVtCdD7U5Vh1ozbaL5XSFXHpwGr2Y7MgPuUUWROcqJ-DJDVu12vtEpUmRAx08fmCBpKj8lvMH_Iv/s1600/vscode-icons_file-type-js-official.png', type: 'Frontend' },
        { id: 3, name: 'HTML', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrwsY0IcvSjvOWuEIaAYUj2tCB4CZ4eE85lkYZDM7CXcYHCUzxXpaVHFjlnMFSzj-NSEbSJp4-0V8GroYylCrub9r3XsKcDo7HocJUW424Fk0BZ_zcQLvfRBc4DxL5-4C3QCwxWZO98Tql6RE-uflMdbIRh363VhMkJWLzVaYmf50UPyC_cf-6xtwX/s1600/vscode-icons_file-type-html.png', type: 'Frontend' },
        { id: 4, name: 'CSS', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfp-K5u6tinC_cBR9dNKJm3uzwdz86USEB7N0eJGkgiBpLZ5w3LlOZTrO6XQmfnzqvkT8du3qyHlNWmXXAWeZxVNhYM6nsLtsVnstY5OnIxaP_jZD8Q98M5xO7mzzqpiTIuOud2TT9xNN69MswF3O4Jlp0DJbOxwe-Bc_rGiOFQrRTvtYp14CeqN0C/s1600/vscode-icons_file-type-css.png', type: 'Frontend' },
        { id: 5, name: 'Python', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj87OjsJ0d7fOmtVcIrF4gWUmUuis4l3ndaEgq_BTYrprEP65reguOZRuTXonhdHkKXyvWFWIh3rex2YwUUGztzhwvW70asN0YGR7pQGTXSwx5SlIbYhji9KcRYBWYF1FxEGq6esYhGR7hBqWNaIJbWaZIvc9q5mS9WUwVI-1B95oXC03RW7HRnVH2s/s1600/vscode-icons_file-type-python.png', type: 'Backend' },
        { id: 6, name: 'Java', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhs4j-lfxcXfp1CJUb-Dhne9soR1TDgCCstVQTXduzzN9gmBa83d2dFEjbC1epR_RwOm-NB7niEIW01uaoPp6kJzYTK1kWQySG2ibr31vuTdQlbvBM5_mmaiap312Yce-DbG2vvtjYyaFafNej--wvywOyNngQjfCDWfvZQSAtOaNaaqeUFEDmNuspK/s1600/logos_java.png', type: 'Android' },
        {
            id: 7, name: 'Kotlin', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj8UnbfVBMtHOfwxZkz_QmkRYjHIcfHqvc5c0ONc6VgqreP0kt2ySn3k1JKw51WczBED4WAuT0eBAMtEWPjE7Wd7034hgJagkgNohttG7AW3lZTgTHvfGSsqF7zSp72Ly_v0_96jLgnGDdEHV2lyzPaXRya6cvUwJ0OTDAM9-xl2HZ0phu7mrRcHUpr/s1600/vscode-icons_file-type-kotlin.png', type: 'Android'
        },
        { id: 8, name: 'React', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgS7nIbi-CZECetKRi9AWhhwitAnL2ZmnG7Br4zlzxkdz6_EXT6YgJ7kyoo2HaQYuMhOnNkhRIuEXdYS_mMp_urF-U_qmLlIolh-69Kti4l2pmtHFsIEG2GBYZ1e22gwwqsB7vvzJvWIGIHRH42wPWrYiQSwfmi9bNRuuMooc4UTkTCcu4We2eNJdmH/s1600/vscode-icons_file-type-reactts.png', type: 'Frontend' },
        { id: 9, name: 'Redux', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgdATv0Jmrby_udAur9GGcR6IIiK80v-luwTOZ56PqK0u3WHnsWdB-Rhd7TEJQ2_A-R4aj_0YILxQGGxYd4VpK2ilkNf2r4GtN0tn64bIXAtn2vPZzD-fnzwgWwPUfk2OjdoyXWodDE0Z1y7neY5XCkMKn4cYaG2O86F1GG-Dj5NxT3NuB0QnPJfGZG/s1600/logos_redux.png', type: 'Frontend' },
        { id: 10, name: 'Django', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjucTYYklT_miBuNQZFJvdMEVisy9OE_siCo7sHBmfaWpxxgI22EJ6-ljxsT3Asfg8e-PYVGtpyHLSAaoGyOF7TtEfb76VOd9XcSPzQWqt85WLZDGMtnClI9mgHKZSAhHYfzT7sKAZSfbm5UFSOn9oe7NQwojIfZ3FyyHP1Z-pApYb8nf8cmkTjidyd/s1600/vscode-icons_file-type-django.png', type: 'Backend' },
        { id: 11, name: 'Swift', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKN7aa8JSwqCLrfCLYCnwOw0OOBlRrkbXfm4MKgwGl5LGk8T5c8iN2Yql2UwEOT3EgbiefdduMRyNBz860_41keDNI4fW-7rlGRsbRoR9IkQKwzaFm5kpVod8q2682GOFnnPeCLhIaWSPWqIEVvBmC1P0EbrEgzZe32XF_CABuUWXNjKp4MqhTuvHX/s1600/vscode-icons_file-type-swift.png', type: 'IOS' },
        { id: 12, name: 'MacOS', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhm-SC1y64ODLRlJQuVfyQB4gb8v3EVDZj-v9g7J_NYV4x8AvwhBE4xmKCt8hMo_rQHs6rLZ9QApeVO4axIdwd2GSXR3UNhlkjahXXokldWVcBNdnR0QEH8QxCknonjhQusbmFog78fxwdzAsNyYG9SI2UmZZqEkhi7vVl6xeduAaFEWPJftL__oCO1/s1600/mac-os%20(1).png', type: 'Технические Менторы' },
        { id: 13, name: 'Windows', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8MegPIEFMKj6JlqD56MitnXVqtBVMG46Es8z2Ue64A_S9p-3278dELrRGREyWm29luvZyf2UqOXSiJ3L61ZwDrzOdnJxgNd-Jvbb9-4FNwkeXHVmdCnSSoYkP9bIkbTWLUEnZCUI51F46T7cNnOj1cTz_eGdD8QiuLxRVW8qj6lNG6Jq5TX4j4n0r/s1600/windows-fill%20(1).png', type: 'Технические Менторы' },
        { id: 14, name: 'Linux', img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4xM3OXUhAcEbBpD8Y-uDpQtVxzN7lDy1iYF8uVa4ltvyQ7iG9WV7FiqGPgniiah8PMMSaemQlcULm8fQWXqV6tabyAo613Ty5e9GXLFKvyuL0afbPOhQ9j3g59JHwnUmMsl0cvBGv53al4grUnnt_brBI9YcfsWNvFwl18OPjLvCQ85Qax-XLyYQi/s1600/devicon_linux%20(1).png', type: 'Технические Менторы' },
    ]

    const [skilF, setSkilF] = useState('')
    const { selected, langMentor } = useSelector(state => state.filterReducer)
    const { mentors, loading, bestMentors } = useSelector(state => state.mentorsReducer)

    const dispatch = useDispatch()
    useEffect(() =>
    {
        window.scrollTo(0, 0)
        if (selected !== "") {
            const api = langMentor ? `${mentorApi}?language=${langMentor}&sortBy=like&order=desc` : `${mentorApi}?course=${selected}&sortBy=like&order=desc`
            dispatch(getMentors(api))
        }
        dispatch(searchMentor(''))
    }, [])
    useEffect(() =>
    {
        if (skilF !== "") {
            const api = `${mentorApi}?skils=${skilF}&sortBy=like&order=desc`
            dispatch(getMentors(api))
        }
        else if (selected === "") {
            dispatch(getMentors(`${mentorApi}?sortBy=like&order=desc`))
        }
    }, [skilF])
    const handleClick = (value) =>
    {
        setSkilF(value)
    }
    if (loading) return <Spinner />
    return (
        <>
            {
                selected === '' ?
                    <div className={styles.page}>
                        <div className={styles.programs}>
                            {
                                programs.slice(0, 11).map((i) => <Programs skilF={skilF} handleClick={handleClick} key={i.id} data={i} />)
                            }
                        </div>
                        {skilF ? <SkilsFiltered langMentor={langMentor} skilF={skilF} /> :
                            <>
                                <div className={styles.headerTitle}>
                                    <h2 className={styles.firstH2}>Лучшие менторы</h2>
                                    <p className={styles.bests}>{bestMentors.length} менторов</p>
                                </div>
                                <div style={{ position: 'relative' }}><SwipperSlider best={true} data={bestMentors} /></div>
                                {
                                    langMentor === 'Кыргызский' ?
                                        <>
                                            <div className={styles.headerTitle}>
                                                <h2>Backend</h2>
                                                <p>{mentors.filter(el => el.course === "Backend").length} менторов</p>
                                            </div>
                                            <div style={{ position: 'relative' }}><SwipperSlider data={langMentor ? mentors.filter(el => el.course === "Backend" && el.language.includes(langMentor)).sort((a, b) => b.like - a.like) : mentors.filter(el => el.course === "Backend").sort((a, b) => b.like - a.like)} /></div>
                                        </>
                                        : <>
                                            <div className={styles.headerTitle}>
                                                <h2>UX-UI Дизайн</h2>
                                                <p>{mentors.filter(el => el.course === "UX/UI Дизайн").length} менторов</p>
                                            </div>
                                            <div style={{ position: 'relative' }}><SwipperSlider data={mentors.filter(el => el.course === "UX/UI Дизайн").sort((a, b) => b.like - a.like)} /></div>
                                        </>
                                }

                                <div className={styles.headerTitle}>
                                    <h2>Frontend</h2>
                                    <p>{mentors.filter(el => el.course === "Frontend").length} менторов</p>
                                </div>
                                <div style={{ position: 'relative' }}><SwipperSlider data={langMentor ? mentors.filter(el => el.course === "Frontend" && el.language.includes(langMentor)).sort((a, b) => b.like - a.like) : mentors.filter(el => el.course === "Frontend").sort((a, b) => b.like - a.like)} /></div>
                            </>
                        }
                    </div>
                    :
                    <div>
                        <FilteredPage skils={programs} langMentor={langMentor} mentorProf={selected} />
                    </div>
            }
        </>


    )
}

export default MentorsPage