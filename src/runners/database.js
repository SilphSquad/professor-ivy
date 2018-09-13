var database = function database(client, config, commands, con){
    // Common responses table
    if (typeof config.adminmodules !== 'undefined' && config.adminmodules.indexOf('commands') !== -1) {
        con.query('SELECT 1 FROM responses LIMIT 1', (err) => {
            // table doesn't exist if there's an error
            if (err) {
                console.log('responses table doesn\'t exist. Attempting to create');
                con.query('CREATE TABLE `responses` (\n' +
                    '  `Id` int(11) NOT NULL AUTO_INCREMENT,\n' +
                    '  `term` varchar(50) COLLATE utf8mb4_bin NOT NULL,\n' +
                    '  `response` varchar(1000) COLLATE utf8mb4_bin NOT NULL,\n' +
                    '  `creator` varchar(50) COLLATE utf8mb4_bin NOT NULL,\n' +
                    '  PRIMARY KEY (`Id`)\n' +
                    ') ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin', (err) => {
                    if (err) appexit(err);
                });
            }
        });
    }


    if(typeof config.modules !== 'undefined'){
        // Trade codes tables
        if (config.modules.indexOf('trade') !== -1){
            con.query('SELECT 1 FROM tradetags LIMIT 1', (err) => {
                if (err){
                    console.log('tradetags table doesn\'t exist. Attempting to create');
                    con.query('CREATE TABLE `tradetags` (\n' +
                        '  `id` int(11) NOT NULL AUTO_INCREMENT,\n' +
                        '  `name` varchar(50) COLLATE utf8mb4_bin NOT NULL,\n' +
                        '  PRIMARY KEY (`id`)\n' +
                        ') ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin', (err) => {
                        if (err) appexit(err);
                    });
                }
            });
            con.query('SELECT 1 FROM tradeusers LIMIT 1', (err) => {
                if (err){
                    console.log('tradeusers table doesn\'t exist. Attempting to create');
                    con.query('CREATE TABLE `tradeusers` (\n' +
                        '  `id` int(11) NOT NULL AUTO_INCREMENT,\n' +
                        '  `trainerCode` varchar(50) COLLATE utf8mb4_bin NOT NULL,\n' +
                        '  `username` varchar(50) COLLATE utf8mb4_bin NOT NULL,\n' +
                        '  `nickname` varchar(50) COLLATE utf8mb4_bin NOT NULL,\n' +
                        '  `userId` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL,\n' +
                        '  PRIMARY KEY (`id`)\n' +
                        ') ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin', (err) => {
                        if (err) appexit(err);
                    });
                }
            });
            con.query('SELECT 1 from tradeusertags LIMIT 1', (err) =>{
                if (err){
                    console.log('tradeusertags table doesn\'t exist. Attempting to create');
                    con.query('CREATE TABLE `tradeusertags` (\n' +
                        '  `id` int(11) NOT NULL AUTO_INCREMENT,\n' +
                        '  `tagId` int(11) NOT NULL,\n' +
                        '  `userId` int(11) NOT NULL,\n' +
                        '  PRIMARY KEY (`id`)\n' +
                        ') ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin', (err) => {
                        if (err) appexit(err);
                    });
                }
            });
        }
    }
};

module.exports = database;