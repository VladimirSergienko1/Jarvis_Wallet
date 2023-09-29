import Select from 'react-select';
import styles from './Select.module.scss'


 const CustomSelect = (props)=> {

    return (
        <div style={{borderRadius:'10px'}}>
            <Select
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '1rem',
                        background: '#EFEFF4',
                        cursor: "pointer",
                        marginBottom: '1.56rem',
                        borderColor: state.isSelected ? "red" : "#EFEFF4",

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