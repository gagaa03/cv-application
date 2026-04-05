import CollapsibleSection from "./CollapsibleSection";
import Icon from "@mdi/react";        
import { mdiCog, mdiTrashCan, mdiPlusCircle, mdiFolderRemove } from '@mdi/js';

function Skills({ data, setData }) {
    // 分類名稱
    const handleCategoryChange = (oldCat, newCat) => {
        const newSkills = { ...data.skills };
        newSkills[newCat] = newSkills[oldCat];
        delete newSkills[oldCat];
        setData({ ...data, skills: newSkills });
    };

    // 移除分類
    const removeCategory = (category) => {
        const newSkills = { ...data.skills };
        delete newSkills[category];
        setData({ ...data, skills: newSkills });
    };

    // 分類的技能
    const handleSkillChange = (category, index, value) => {
        const newSkills = { ...data.skills };
        const updated = [...newSkills[category]];
        updated[index] = value;
        newSkills[category] = updated;
        setData({ ...data, skills: newSkills });
    };

    const addCategory = () => {
        setData({ ...data, skills: { ...data.skills, "New Category": [""] } });
    };

    const addSkill = (category) => {
        const newSkills = { ...data.skills };
        newSkills[category] = [...newSkills[category], ""];
        setData({ ...data, skills: newSkills });
    };

    const removeSkill = (category, index) => {
        const newSkills = { ...data.skills };
        newSkills[category] = newSkills[category].filter((_, i) => i !== index);
        setData({ ...data, skills: newSkills });
    };

    return (
        <CollapsibleSection title="Skills" icon={mdiCog}>
        {Object.entries(data.skills).map(([category, skills]) => (
                <div key={category} className="skill-category-group">
                    <div className="category-header">
                        <input 
                            className="category-input"
                            value={category} 
                            onChange={(e) => handleCategoryChange(category, e.target.value)} 
                            placeholder="Category Name"
                        />

                        <button 
                            type="button" 
                            className="remove-category" 
                            onClick={() => {
                                if(window.confirm(`Are you sure you want to delete the "${category}" category?`)) {
                                    removeCategory(category);
                                }
                            }}
                        >
                            <Icon path={mdiFolderRemove} size={0.8} />
                        </button>
                    </div>

                    {skills.map((skill, index) => (
                        <div key={index} className="multi-item">
                            <input 
                                value={skill} 
                                onChange={(e) => handleSkillChange(category, index, e.target.value)} 
                                placeholder="Skill"
                            />
                            <button type="button" onClick={() => removeSkill(category, index)}>
                                <Icon path={mdiTrashCan} size={0.7} />
                            </button>
                        </div>
                    ))}
                    
                    <button type="button" className="add-sub" onClick={() => addSkill(category)}>
                        <Icon path={mdiPlusCircle} size={0.6} /> <span>Add Skill</span>
                    </button>
                    <hr />
                    
                </div>
            ))}
        <button type="button" className="add" onClick={addCategory}>
            <Icon path={mdiPlusCircle} size={0.7} />
            <span>Add Category</span>
        </button>
        </CollapsibleSection>
    );
}

export default Skills;









// import { useState } from "react";

// export default function Skills() {
//     const [isEditing, setIsEditing] = useState(true);
//     const [skills, setSkills] = useState("");

//     function handleSubmit(e) {
//         e.preventDefault();
//         setIsEditing(false);
//     }

//     return (
//         <div>
//         <h2>Skills</h2>
//         {isEditing ? (
//             <form onSubmit={handleSubmit}>
//             <textarea
//                 rows="3"
//                 value={skills}
//                 onChange={(e) => setSkills(e.target.value)}
//                 placeholder="List your skills..."
//             />
//             <button type="submit">Submit</button>
//             </form>
//         ) : (
//             <div>
//             <p>{skills}</p>
//             <button onClick={() => setIsEditing(true)}>Edit</button>
//             </div>
//         )}
//         </div>
//     );
// }