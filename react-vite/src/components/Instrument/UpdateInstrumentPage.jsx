import InstrumentForm from "./InstrumentForm";


export default function UpdateInstrumentPage() {

    const buttonName = 'Update Instrument'

    return (
        <div id="create-inst-form-container">
            <h1>Update Your Gear!</h1>
            <InstrumentForm buttonName={buttonName} />
        </div>            
    );
}

