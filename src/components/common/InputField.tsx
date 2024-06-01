import React from 'react'

type Props = {
    labelTitle : string
    placeholder? : string
    name : string
    id : string
    type: string

}

const InputField: React.FC<Props> = ({ labelTitle, placeholder, name, id, type}) => {
    return(
        <div>
            <label 
                htmlFor={id} 
                className="text-darktext block mb-2 text-sm">{labelTitle}
            </label>
            <input 
                type={type} 
                name={name} id={id} 
                placeholder= {placeholder ?? ""} 
                className = "bg-gray-50 border border-gray-300 text-darktext rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" >
            </input>
        </div>
    )
}

export default InputField