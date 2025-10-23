

import  {useState} from 'react';

import './App.css';

export const AddAuthor = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        onSubmit(name, description);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>添加作家</h2>
                <label>
                    笔名:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    简介:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <button onClick={handleSubmit}>确定</button>
                <button onClick={onClose}>取消</button>
            </div>
        </div>
    );
};