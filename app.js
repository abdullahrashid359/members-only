const net = require('node:net');
net.setDefaultAutoSelectFamily(false);

if (process.env.NODE_ENV !== 'production') {
    process.loadEnvFile('.env');
}

const express = require('express');
const path = require('node:path');