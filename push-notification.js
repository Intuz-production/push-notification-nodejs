// Copyright (C) 2018 INTUZ. 

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
// ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
// THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
var FCM = require('fcm-push');

var serverKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Server Key
var fcm = new FCM(serverKey);

exports.pushnfc = function(){
    return {
        /*
         * Use: send push notification to mobile app user
         * Args: user_id, device_token, device_type, type, msg_body         
         * Return: err(String of error message), response(object)
         */
        sendNotification: function(user_id = '', device_token = '', device_type = '', type = '', msg_body = '') {
            var message = {
                to: device_token,
                data: {
                    user_id: user_id,
                    title: 'My App', // you can replace your app name here
                    body: msg_body,
                    type :type, // type is for internal purpose, to identify the type of notification within app
                },
            };
            
            fcm.send(message, function(err, response){
                if (err) {
                    console.log("Something has gone wrong!:", err);
                } 
                else {
                    console.log("Successfully sent with response: ", response);
                }
                return;
            });
            return;
        },

        /*
         * Use: to store notifications data into database
         * Args: req, from_user_id, to_user_id, message, type, status, is_read
         * Return: err(String of error message), response(object)
         */
        saveNotification: function(req = '', from_user_id, to_user_id, message, type, status, is_read){
            req.getConnection(function(err, connection) {
                var created_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                var qr = "INSERT INTO notification (from_user_id, to_user_id, message, type, status, is_read, created_date) VALUES('" + from_user_id + "', '" + to_user_id + "', '" + message + "', '" + type + "', '" + status + "', '" + is_read + "', " + created_date + "')";
                connection.query(qr,message, function(err, result){
                    if(err) {
                        throw err;
                        return;
                    }
                    else {
                        console.log('done');
                        return;
                    }
                })  
            });
        },
    };
 }
