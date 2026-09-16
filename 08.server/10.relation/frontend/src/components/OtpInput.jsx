import OtpInput from 'react-otp-input';

export default function OTPInput({ value, onChange }) {
    return (
        <OtpInput
            value={value}
            onChange={onChange}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} className='border border-blue-600 rounded-sm'
                style={{
                    width: "24px",
                    textAlign: "center",
                    margin: "4px"
                }}
            />}
            inputType='tel'
        />
    );
}