import CollapsibleSection from "./CollapsibleSection";
import { mdiAccountTie } from '@mdi/js';

function GeneralInfo({ data, setData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;

        // 允許數字、"+" 號以及 "空格"
        if (name === "phone") {
            const filteredValue = value.replace(/[^0-9+\s]/g, '');
            setData({ ...data, [name]: filteredValue });
            return;
        }

        setData({ ...data, [name]: value });
    };

    return (
        <CollapsibleSection title="Personal Information" icon={mdiAccountTie}>
            <label>
                First Name
                <input
                    type="text"
                    name="firstName"
                    value={data.firstName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Last Name
                <input
                    type="text"
                    name="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                />
            </label>
            <label>
                M.I.
                <input
                    type="text"
                    name="middleInitial"
                    value={data.middleInitial}
                    onChange={handleChange}
                />
            </label>
            <label>
                Job Title
                <input
                    type="text"
                    name="jobTitle"
                    value={data.jobTitle}
                    onChange={handleChange}
                />
            </label>
            <label>
                Phone
                <input
                    type="tel"
                    name="phone"
                    placeholder="+886 912345678"
                    value={data.phone}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email
                <input 
                    type="email" 
                    name="email"
                    placeholder="example@gmail.com"
                    value={data.email}
                    onChange={handleChange}
                />
            </label>
            <label>
                Github
                <input 
                    type="url" 
                    name="github"
                    placeholder="https://github.com/username"
                    value={data.github}
                    onChange={handleChange}
                />
            </label>
            <label>
                Personal Website
                <input 
                    type="url" 
                    name="website"
                    placeholder="https://yourwebsite.com"
                    value={data.website}
                    onChange={handleChange}
                />
            </label>
            <label>
                Location
                <input 
                    type="text" 
                    name="location"
                    value={data.location}
                    onChange={handleChange}
                />
            </label>
        </CollapsibleSection>
    );
}

export default GeneralInfo;



