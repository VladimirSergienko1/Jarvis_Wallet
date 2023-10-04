import Select from 'react-select';


 const CustomSelect = (props)=> {

    return (
        <div>
            <Select
                styles={{
                    container: (provided) => ({
                        ...provided,
                        width: props.width || 240
                    }),
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '1rem',
                        background: '#EFEFF4',
                        cursor: "pointer",
                       /* marginBottom: '1.56rem',*/
                        borderColor: state.isSelected ? "#EFEFF4" : "#EFEFF4",
                        boxShadow: state.isFocused ? 0 : 0,
                        "&:hover": {
                            borderColor: state.isSelected ? "#EFEFF4" : "#EFEFF4"
                        }

                    }),
                    menu: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: '#EFEFF4',
                    /*    borderRadius: '1rem',*/
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor:
                            state.isSelected ? '#dedede'
                            : state.isFocused ? '#f0f0f0'
                            : state.isActive ? '#f0f0f0'
                            : null,
                        color: '#333',
                        cursor: 'pointer',
                    }),
                }}
                defaultValue={props.defaultValue}
                onChange={props.onChange}
                options={props.options}
            />
        </div>
    );
}
export default CustomSelect