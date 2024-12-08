// resources/js/Pages/Auth/OtpVerify.jsx

import React, { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { Row, Col, Input, Button, Form, Typography, Space, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text, Link } = Typography;

export default function OtpVerify() {
    const { data, setData, post, processing, errors } = useForm({
        otp: '',
    });

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [resendCooldown, setResendCooldown] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const inputRefs = useRef([]);
    const [isResending, setIsResending] = useState(false);

    // Handle input change for OTP fields
    const handleChange = (element, index) => {
        const { value } = element;
        if (isNaN(value)) return;

        let newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setData('otp', newOtp.join(''));

        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && otp[index] === "") {
            if (index > 0) inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle form submission
    const handleSubmit = () => {
        post(route('otp.check'));
    };

    // Handle Resend OTP
    const handleResendOtp = async () => {
        try {
            setIsResending(true);
            // Use route helper instead of hardcoded URL
            const response = await axios.post(route('otp.resend'), {}, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            });
            
            message.success('OTP has been resent to your device');
            
            // Start cooldown
            setResendCooldown(true);
            let timeLeft = 30;
            
            const timer = setInterval(() => {
                timeLeft -= 1;
                setCountdown(timeLeft);
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    setResendCooldown(false);
                    setCountdown(30);
                }
            }, 1000);
            
        } catch (error) {
            console.error('Resend Error:', error);
            message.error('Failed to resend OTP. Please try again.');
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <Title level={3} style={{ textAlign: 'center' }}>
                    Account Verification
                </Title>
                <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '20px' }}>
                    Enter the 6-Digit PIN sent to your registered Email
                </Text>

                <Form onFinish={handleSubmit} layout="vertical">
                    <Form.Item>
                        <Row gutter={8} justify="center">
                            {otp.map((value, index) => (
                                <Col span={4} key={index}>
                                    <Input
                                        maxLength={1}
                                        style={styles.otpInput}
                                        value={otp[index]}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        onChange={(e) => handleChange(e.target, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onFocus={(e) => e.target.select()}
                                    />
                                </Col>
                            ))}
                        </Row>
                        {errors.otp && <Text type="danger">{errors.otp}</Text>}
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            icon={<LockOutlined />}
                            loading={processing}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Text type="secondary">
                        Didn't receive the code?{' '}
                        {resendCooldown ? (
                            <span>Resend available in {countdown} seconds</span>
                        ) : (
                            <Link 
                                onClick={handleResendOtp} 
                                disabled={isResending || resendCooldown}
                            >
                                {isResending ? 'Resending...' : 'Send again'}
                            </Link>
                        )}
                    </Text>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
    },
    innerContainer: {
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    otpInput: {
        textAlign: 'center',
        fontSize: '24px',
        padding: '8px',
        borderRadius: '12px',
        border: '1px solid #d9d9d9',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
};
