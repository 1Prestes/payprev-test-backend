const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return {
                // Your connection string 
                bd_string: 'mongodb+srv://admin:rbbcvgfhyt@ask-food-ownhb.mongodb.net/test?retryWrites=true&w=majority',
                jwt_pass: 'sad2f31sad56f1asd5f6sa51f5sa6f5sa1fa8e9sadf21asd65',
                jwt_expires_in: '1d',
            }
        case 'hml':
            return {}
        case 'prod':
            return {}
    }
}

module.exports = config();
