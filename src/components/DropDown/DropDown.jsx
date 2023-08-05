import { useEffect, useState } from 'react';
import styles from './dropDown.module.css';
import { useSelector } from 'react-redux';

const DropDown = () =>
{
    const { questions, loading, error } = useSelector(state => state.questionsReducer)
    const [content, setContent] = useState([
    ])
    useEffect(() =>
    {
        setContent(questions)
    }, [questions])
    return (
        <div className={styles.container}>
            {
                content.map((item, i) =>
                    <div key={i} className={styles.dropdown}>
                        <div className={styles.dropdown_item}>
                            <input type="radio" id={item.id} name='item' />
                            <label className={styles.dropdown_item_toggle} htmlFor={item.id}>{item.label}</label>
                            <label className={styles.dropdown_item_close} htmlFor="close-all"></label>
                            <div className={styles.dropdown_item_content}>
                                <p>{item.title}</p>
                            </div>
                        </div>
                        <input className={styles.dropdown_hiddenInput} type="radio" name='item' id='close-all' />
                    </div>
                )
            }
        </div>
    );
};

export default DropDown;