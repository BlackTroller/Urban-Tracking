// in LatLongInput.js
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useInput, FieldTitle } from 'ra-core';
import { CommonInputProps, InputHelperText, sanitizeInputRestProps } from 'react-admin';

// hh:mm:ss
const timeRegex = /^\d{2}:\d{2}:\d{2}$/;
// hh:mm
const timeZeroStepRegex = /^\d{2}:\d{2}$/;
const defaultInputLabelProps = { shrink: true };

/**
 * Converts a time string without timezone to a date object
 * with timezone, using the browser timezone.
 *
 * @param {string} value Date string, formatted as hh:mm
 * @return {Date}
 */
const parseFromTimeString = (value: string) => {
    if (!value) return null;
    //const timeTokens = value.split(':').map(v => parseInt(v));
    //const today = new Date();
    //today.setHours(timeTokens[0] ?? 0);
    //today.setMinutes(timeTokens[1] ?? 0);
    //today.setSeconds(timeTokens[2] ?? 0);
    
    if(timeZeroStepRegex.test(value)) value += ":00";

    return value;
};

/**
 * Form input to edit a time string value in the "HH:mm" format (e.g. '17:45'),
 * using the browser locale for the timezone.
 *
 * Renders a time picker or a text input depending on the browser.
 *
 * This component works with Date objects to handle the timezone using the browser locale.
 * You can still pass string values as long as those can be converted to a JavaScript Date object.
 *
 * @example
 * import { Edit, SimpleForm, TimeInput } from 'react-admin';
 *
 * const PostEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <TimeInput source="published_at" />
 *         </SimpleForm>
 *     </Edit>
 * );
 */
export const SimpleTimeInput = ({
    className,
    defaultValue,
    format = formatTime,
    label,
    helperText,
    margin,
    onBlur,
    onChange,
    source,
    resource,
    parse = parseFromTimeString,
    validate,
    variant,
    ...rest
}: TimeInputProps) => {
    const { field, fieldState, formState, id, isRequired } = useInput({
        defaultValue,
        format,
        parse,
        onBlur,
        onChange,
        resource,
        source,
        validate,
        ...rest,
    });

    const { error, invalid, isTouched } = fieldState;
    const { isSubmitted } = formState;

    return (
        <>
            <TextField
                id={id}
                {...field}
                className={clsx('ra-input', `ra-input-${source}`, className)}
                type="time"
                inputProps={{step: 1}}
                size="small"
                variant={variant}
                margin={margin}
                error={(isTouched || isSubmitted) && invalid}
                helperText={
                    <InputHelperText
                        touched={isTouched || isSubmitted}
                        error={error?.message}
                        helperText={helperText}
                    />
                }
                label={
                    <FieldTitle
                        label={label}
                        source={source}
                        resource={resource}
                        isRequired={isRequired}
                    />
                }
                InputLabelProps={defaultInputLabelProps}
                {...sanitizeInputRestProps(rest)}
            />
        </>
        
    );
};

SimpleTimeInput.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    resource: PropTypes.string,
    source: PropTypes.string,
};

export type TimeInputProps = CommonInputProps &
    Omit<TextFieldProps, 'helperText' | 'label'>;

const leftPad = (nb = 2) => (value: any) => ('0'.repeat(nb) + value).slice(-nb);
const leftPad2 = leftPad(2);

/**
 * @param {Date} value value to convert
 * @returns {String} A standardized time (hh:mm:ss), to be passed to an <input type="time" />
 */
const convertDateToString = (value: Date) => {
    if (!(value instanceof Date) || isNaN(value.getDate())) return '';
    const hh = leftPad2(value.getHours());
    const mm = leftPad2(value.getMinutes());
    const ss = leftPad2(value.getSeconds());
    return `${hh}:${mm}:${ss}`;
};

const convertSecondsToDateString = (value: number): string => {
    const date = new Date(value * 1000); // Convert seconds to milliseconds
    return date.toISOString().substr(11, 8); // Extract "HH:mm:ss"
};


/**
 * Converts a date from the dataProvider, with timezone, to a time string
 * without timezone for use in an <input type="time" />.
 *
 * @param {Date | String} value date string or object
 */
const formatTime = (value: string | Date | number) => {

    // null, undefined and empty string values should not go through convertDateToString
    // otherwise, it returns undefined and will make the input an uncontrolled one.
    if (value === null || value === '' || value === 'no') {
        return '';
    }

    if (value instanceof Date) {
        return convertDateToString(value);
    }
    // valid dates should not be converted
    if (typeof value==='string' && (timeRegex.test(value) || timeZeroStepRegex.test(value))) {
        return value;
    }
    // valid dates should not be converted
    if (typeof value==='number') {
        return convertSecondsToDateString(value)
    }

    return convertDateToString(new Date(value));
};

export default SimpleTimeInput;

/*


// in LatLongInput.js
import { useInput } from 'react-admin';
import TimeField from './react-simple-timefield';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';

const SimpleTimeInput = (props) => {
    const {onChange, onBlur, ...rest} = props;

    const {
        field,
        fieldState,
        formState: {isSubmitted},
        isRequired
    } = useInput({
        // Pass the event handlers to the hook but not the component as the field property already has them.
        // useInput will call the provided onChange and onBlur in addition to the default needed by react-hook-form.
        onChange,
        onBlur,
        ...props,
    });

    const { setValue, getValues } = useFormContext();

    const [loading, isLoading] = useState<boolean>(true);
    const { error, invalid, isTouched } = fieldState;
    const [time, setTime] = useState<string>("00:00:00");
    const myRef = useRef(null);

    function convertDate(value: number | string){
        if(typeof value==='number'){
            const temp = new Date(value * 1000).toISOString().slice(11, 19);
            setTime(prevState => prevState=temp);
            setValue(field.name, temp);
            if(loading) isLoading(false);
        } else if(typeof value==='string'){
            setTime(prevState => prevState=value);
            if(loading) isLoading(false);
        }
        
    }
    
    useEffect(() => {

        if(field.value){
            convertDate(field.value);
        } else {
            if(loading) isLoading(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitted && !error]);

    console.log(field)
    console.log(time)

    return !loading ? (
        <TimeField
            // showSecond
            value={time}
            ref={myRef}
            showSeconds
            input={<TextField
                ref={myRef}
                value={time}
                label={props.label}
                size={"small"}
                error={(isTouched || isSubmitted) && invalid}
                helperText={isSubmitted && error ? error.message : ''  }
                required={isRequired}
            />}
        />
    ) : null;
};
export default SimpleTimeInput;

*/
