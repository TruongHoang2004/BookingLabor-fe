export default function Note() {
    return (
        <div
            style={{
                width: '450px',
                height: '120px',
                textAlign: 'center',
                color: 'black',
                fontSize: '15px',
                fontWeight: '300',
                fontFamily: 'Inter',
                lineHeight: '36px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                background: 'linear-gradient(to right, #e0c3fc, #8ec5fc)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginTop: '50px',
                marginLeft: '300px',
                padding: '10px',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <span><strong>Note:</strong></span>
                <span>Don&apos;t forget to bring your laptop</span>
            </div>
        </div>
    );
}