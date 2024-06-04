import React, {ChangeEvent} from 'react'

type Props = {
    labelTitle : string
    placeholder? : string
    name : string
    id : string
    type: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    customStyling: string
}

const InputField: React.FC<Props> = ({ labelTitle, placeholder, name, id, type, onChange, customStyling}) => {
    return(
        <div>
            <label 
                htmlFor={id} 
                className="text-text-normal block mb-2 text-sm">{labelTitle}
            </label>
            <input 
                type={type} 
                name={name} id={id} 
                placeholder= {placeholder ?? ""} 
                onChange={onChange}
                /**NOTE: CustomStyling should include: bg, broder, placeholder**/
                className = {`bg-background-secondary border border-inputField-border placeholder-inputField-placeholder text-text-normal rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 ${customStyling}`} >
            </input>
        </div>
    )
}

export default InputField