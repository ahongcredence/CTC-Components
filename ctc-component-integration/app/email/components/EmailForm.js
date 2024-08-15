'use client'
import React, { useState } from 'react';

// Ensure USWDS CSS is included in public/index.html
const EmailForm = () => {
    const [toAddresses, setToAddresses] = useState('');
    const [ccAddresses, setCcAddresses] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const toArray = toAddresses.split(',').map(email => email.trim()).filter(email => email !== '');
        const ccArray = ccAddresses.split(',').map(email => email.trim()).filter(email => email !== '');

        const invalidToEmails = toArray.filter(email => !validateEmail(email));
        const invalidCcEmails = ccArray.filter(email => !validateEmail(email));

        if (invalidToEmails.length > 0 || invalidCcEmails.length > 0) {
            setError(`Invalid email addresses: ${[...invalidToEmails, ...invalidCcEmails].join(', ')}`);
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('toAddresses', JSON.stringify(toArray));
        formData.append('ccAddresses', JSON.stringify(ccArray));
        formData.append('subject', subject);
        formData.append('body', body);

        for (let i = 0; i < files.length; i++) {
            formData.append('attachments', files[i]);
        }
        console.log(formData.get("body"))
        
        try {
            const response = await fetch('/api/email/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: formData
            })
            if (response.ok) {
                const result = await response.json()
                console.log("email sent: ", result)
                setToAddresses('');
                setCcAddresses('');
                setSubject('');
                setBody('');
                setFiles([]);
            }
            else {
                const errorData = await response.json();
                console.error('Error sending email:', errorData.message || 'Unknown error');
                alert(`Error: ${errorData.message || 'Failed to send email'}`);
            }
        }
        catch (error) {
            console.error('Network error or issue with request: ', error)
            alert("Error occured. Please try again later")
        }
    };

    return (
        <div className="usa-form-group">
            <h1 className="usa-heading">Send Email</h1>
            <form onSubmit={handleSubmit} className="usa-form">
                {error && <div className="usa-error-message"><p>{error}</p></div>}
                <div className="usa-form-group">
                    <label className="usa-label" htmlFor="toAddresses">To (comma-separated):</label>
                    <input
                        id="toAddresses"
                        type="text"
                        className="usa-input"
                        value={toAddresses}
                        onChange={(e) => setToAddresses(e.target.value)}
                        placeholder="e.g., example1@example.com, example2@example.com"
                        required
                    />
                </div>
                <div className="usa-form-group">
                    <label className="usa-label" htmlFor="ccAddresses">Cc (comma-separated):</label>
                    <input
                        id="ccAddresses"
                        type="text"
                        className="usa-input"
                        value={ccAddresses}
                        onChange={(e) => setCcAddresses(e.target.value)}
                        placeholder="e.g., example3@example.com, example4@example.com"
                    />
                </div>
                <div className="usa-form-group">
                    <label className="usa-label" htmlFor="subject">Subject:</label>
                    <input
                        id="subject"
                        type="text"
                        className="usa-input"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div className="usa-form-group">
                    <label className="usa-label" htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        className="usa-textarea"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>
                <div className="usa-form-group">
                    <label className="usa-label" htmlFor="attachments">Attachments:</label>
                    <input
                        id="attachments"
                        type="file"
                        multiple
                        className="usa-file-input"
                        onChange={handleFileChange}
                    />
                </div>
                <button
                    type="submit"
                    className="usa-button"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Email'}
                </button>
            </form>

        </div>
    );
};

export default EmailForm;
