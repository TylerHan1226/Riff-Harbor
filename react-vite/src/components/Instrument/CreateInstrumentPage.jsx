import InstrumentForm from "./InstrumentForm";

export default function CreateInstrumentPage() {

    const buttonName = 'Post Instrument'

    const instrument = {
        make: '',
        model: '',
        color: '',
        category: '',
        price: '',
        details: '',
        body: '',
        fretboard: '',
        is_used: false,
        image_url: ''
    }

    return (
        <div id="create-inst-form-container">
            <h1>Sell Your Gear!</h1>
            <InstrumentForm buttonName={buttonName} instrument={instrument} />
        </div>            
    );
}

