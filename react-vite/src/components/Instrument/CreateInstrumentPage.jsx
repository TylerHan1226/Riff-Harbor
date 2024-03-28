import InstrumentForm from "./InstrumentForm";

export default function CreateInstrumentPage() {

    const buttonName = 'Post Instrument'


    return (
        <div id="create-inst-form-container">
            <h1>Sell Your Gear</h1>
            <InstrumentForm buttonName={buttonName}/>
        </div>            
    );
}

