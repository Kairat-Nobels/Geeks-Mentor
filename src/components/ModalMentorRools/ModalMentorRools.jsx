import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import styles from "./ModalMentorRools.module.css"
import close from "../../assets/images/Home/x.svg";

function ModalMentorRools({ setModal })
{
    useEffect(() =>
    {
        document.body.style.overflow = 'hidden';
    }, []);
    const closeModal = (e) =>
    {
        if (!document.querySelector('#modal').contains(e.target)) {
            document.body.style.overflow = '';
            setModal(false);
        }
    };

    const handleClose = () =>
    {
        document.body.style.overflow = '';
        setModal(false);
    };

    return (
        <div onClick={closeModal} className={`${styles.window} window`}>
            <section id='modal' className={styles.content}>
                <h3>Правила Менторства</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam voluptas, impedit, nobis harum molestiae iure dolores minus porro maiores eaque optio quidem quod facilis repellat debitis explicabo error culpa nihil! Adipisci, nihil impedit. Soluta velit ex pariatur facere doloremque! Ab nesciunt consequatur odio, provident modi vero eveniet ipsam facilis dolore veritatis temporibus. Possimus maxime eaque magni dolor culpa fugiat molestiae repellat voluptas explicabo, cum, perferendis sapiente, delectus tempore. Quo ratione saepe quisquam iste facilis excepturi veniam perspiciatis, voluptate sint, hic recusandae voluptates odio? Iure magnam fugiat eligendi delectus dolore! Exercitationem sint adipisci, voluptatum blanditiis eos qui veritatis optio praesentium laudantium unde placeat obcaecati error nemo ad? Reiciendis in provident, tempora at recusandae ut nostrum! Tempore debitis id vel magnam molestiae modi fuga temporibus, velit tempora iusto. Necessitatibus fuga ea voluptate laborum natus sed commodi quidem nemo totam adipisci incidunt, voluptates nihil corrupti, cupiditate laboriosam reprehenderit veritatis. Quibusdam perspiciatis rerum alias totam aut odio possimus numquam veritatis sit velit enim animi, adipisci ad eligendi autem, voluptatibus voluptate? Aspernatur illum ducimus sint voluptas nobis neque, est excepturi magni ex? Numquam perspiciatis culpa dicta deserunt animi nostrum, quaerat, odio et recusandae sed quos magnam eveniet obcaecati ratione neque nemo ipsum. Accusantium, rerum? Suscipit dignissimos, a minus quibusdam possimus eveniet corrupti, harum veritatis perspiciatis eius eos vero amet provident! Odio consequuntur culpa repellat laudantium.</p>
                <div onClick={handleClose} className={styles.btn}><img src={close} alt="" /></div>
                <div className={styles.buttonsEnd}>
                    <button type='button' onClick={handleClose} className={styles.save}>Закрыть</button>
                </div>
            </section>
        </div>
    );
}

export default ModalMentorRools;
