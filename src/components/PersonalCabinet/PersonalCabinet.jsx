import { useEffect, useState } from 'react'
import profileImage from '../../assets/images/defaultAva.svg'
import PersonalCabinetMentor from './PersonalCabinetMentor/PersonalCabinetMentor'
import PersonalCabinetVisitor from './PersonalCabinetVisitor/PersonalCabinetVisitor'
import { useSelector } from 'react-redux'
import styles from './personalCabinet.module.css'
import PersonalCabinetStudent from './PersonalCabinetStudent/PersonalCabinetStudent'

function PersonalCabinet({ modal, setModal })
{
    const { infoM } = useSelector(state => state.mentorsReducer)
    const { info } = useSelector(state => state.usersReducer)
    const [defaultView, setdefaultView] = useState(false)
    const [modalName, setModalName] = useState(false)
    const [fullName, setFullName] = useState('')
    const [like, setLike] = useState(0)
    const [dislike, setDislike] = useState(0)
    const [image, setImage] = useState(profileImage)
    const [role, setRole] = useState('Студент')

    const [skills, setSkills] = useState(['Wireframing', 'Benchmarking', 'Style Guide', 'Typography', 'Figma', 'CJM', 'User Persona', 'User Flow'])

    const toggleCabinetView = () =>
    {
        setdefaultView(!defaultView)
    }

    useEffect(() =>
    {
        infoM && setRole(infoM.role)
        if (infoM) {
            setFullName(infoM.name)
            setSkills(infoM.skils)
            setDislike(infoM.dislike)
            setLike(infoM.like)
            infoM.ava && setImage(infoM.ava)
        }
    }, [infoM])
    useEffect(() =>
    {
        info && setRole(info.role)
        if (info) {
            setFullName(info.name)
            info.ava && setImage(info.ava)
        }
    }, [info])

    return (
        <div className={styles.generalWrapper}>
            {
                role === 'Студент' && !defaultView && (
                    <PersonalCabinetStudent
                        fullName={fullName}
                        info={info}
                        image={image}
                        modalName={modalName}
                        setModalName={setModalName}
                        setImage={setImage}
                    />
                )
            }
            {
                role === 'Ментор' && !defaultView && (
                    <PersonalCabinetMentor
                        fullName={fullName}
                        info={infoM}
                        modalName={modalName}
                        setModalName={setModalName}
                        toggleCabinetView={toggleCabinetView}
                        skills={skills}
                        modal={modal}
                        setModal={setModal}
                        image={image}
                        setImage={setImage}
                        setSkills={setSkills}
                    />
                )
            }
            {
                role === 'Ментор' && defaultView && (
                    <PersonalCabinetVisitor
                        fullName={fullName}
                        info={infoM}
                        image={image}
                        toggleCabinetView={toggleCabinetView}
                        skills={skills}
                        like={like}
                        dislike={dislike}
                    />
                )
            }
        </div>
    )
}

export default PersonalCabinet
