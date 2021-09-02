require('dotenv').config();
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID } = process.env;
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

exports.phoneOtpSend = async (req, res) => {
    const channel = 'sms';
    let verificationRequest;
    try {
        verificationRequest = await twilio.verify.services(VERIFICATION_SID)
            .verifications
            .create({ to: '+' + req.query.phone, channel });
        return res.status(200).send({ msg: "Verify Otp Send" });
    } catch (e) {
        console.log(e);
        return res.status(400).send({ msg: e });
    }
}

exports.phoneOtpVerify = async (req, res) => {
    const { verificationCode: code } = req.body;
    let verificationResult;
    const errors = { wasValiated: true };
    try {
        verificationResult = await twilio.verify.services(VERIFICATION_SID)
            .verificationChecks
            .create({ code, to: '+' + req.query.phone });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ msg: e });
    }
    if (verificationResult.status === 'approved') {
        let user = await User.findOne({ email: req.query.email });
        if (user) {
            user.isPhoneVerified = true;
            user.save()
                .then(u => {
                    return res.status(200).send({ msg: "Phone Verified Successfully " })
                })
                .catch(e => {
                    return res.status(400).send({ msg: e.message })
                })
        } else {
            return res.status(400).send({ msg: "User Does Not Exist" })
        }
    } else {
        return res.status(400).send({ msg: `Unable To Verify Code. Status: ${verificationResult.status}` })
    }
}
