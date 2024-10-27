export default function PaymentMethod() {
    return (
        <div
            style={{
                width: '250px',
                height: '250px',
                textAlign: 'left',
                color: 'black',
                fontSize: '15px',
                fontWeight: 300,
                fontFamily: 'Inter',
                lineHeight: '24px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                background: 'linear-gradient(to right, #e0c3fc, #8ec5fc)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginTop: '15px',
                marginLeft: '1080px',
                padding: '20px',
            }}
        >
            {/* Paying in advance */}
            <label style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <input type="radio" name="paymentMethod" value="inAdvance" style={{ marginRight: '10px' }} />
                Paying in advance
            </label>
            <div style={{ marginLeft: '20px', color: '#555' }}>
                <p style={{ marginBottom: '3px', marginLeft: '10px' }}>Online Banking</p>
            </div>

            {/* Pay later */}
            <label style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <input type="radio" name="paymentMethod" value="payLater" style={{ marginRight: '10px' }} />
                Pay later
            </label>
            <div style={{ marginLeft: '20px', color: '#555' }}>
                <p style={{ marginBottom: '3px', marginLeft: '10px' }}>On cash</p>
            </div>

            {/* Deposit */}
            <label style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <input type="radio" name="paymentMethod" value="deposit" style={{ marginRight: '10px' }} />
                Deposit
            </label>
            <div style={{ marginLeft: '20px', color: '#555' }}>
                <p style={{ marginBottom: '3px', marginLeft: '10px' }}>Online Banking</p>
            </div>
        </div>
    );
}
