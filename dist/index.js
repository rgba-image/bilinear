"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bilinear = (source, dest, sx = 0, sy = 0, sw = source.width - sx, sh = source.height - sy, dx = 0, dy = 0, dw = dest.width - dx, dh = dest.height - dy) => {
    sx = sx | 0;
    sy = sy | 0;
    sw = sw | 0;
    sh = sh | 0;
    dx = dx | 0;
    dy = dy | 0;
    dw = dw | 0;
    dh = dh | 0;
    if (sw <= 0 || sh <= 0 || dw <= 0 || dh <= 0)
        return;
    const xRatio = sw / dw;
    const yRatio = sh / dh;
    for (let y = 0; y < dh; y++) {
        const destY = dy + y;
        if (destY < 0 || destY >= dest.height)
            continue;
        const sourceY = y * yRatio + sy;
        const yMin = sourceY | 0;
        const yMax = Math.min(Math.ceil(sourceY), source.height - 1);
        for (let x = 0; x < dw; x++) {
            const destX = dx + x;
            if (destX < 0 || destX >= dest.width)
                continue;
            const sourceX = x * xRatio + sx;
            const xMin = sourceX | 0;
            const xMax = Math.min(Math.ceil(sourceX), source.width - 1);
            const destIndex = (destY * dest.width + destX) * 4;
            assign(source, dest, destIndex, 0, sourceX, xMin, xMax, sourceY, yMin, yMax);
            assign(source, dest, destIndex, 1, sourceX, xMin, xMax, sourceY, yMin, yMax);
            assign(source, dest, destIndex, 2, sourceX, xMin, xMax, sourceY, yMin, yMax);
            assign(source, dest, destIndex, 3, sourceX, xMin, xMax, sourceY, yMin, yMax);
        }
    }
};
const interpolate = (k, kMin, vMin, kMax, vMax) => {
    // special case - k is integer
    if (kMin === kMax)
        return vMin;
    return Math.round((k - kMin) * vMax + (kMax - k) * vMin);
};
const assign = (source, dest, destIndex, channel, sx, xMin, xMax, y, yMin, yMax) => {
    const sw = source.width;
    const sourceData = source.data;
    const destData = dest.data;
    let minIndex = (yMin * sw + xMin) * 4 + channel;
    let maxIndex = (yMin * sw + xMax) * 4 + channel;
    const vMin = interpolate(sx, xMin, sourceData[minIndex], xMax, sourceData[maxIndex]);
    // special case, y is integer
    if (yMax === yMin) {
        destData[destIndex + channel] = vMin;
    }
    else {
        minIndex = (yMax * sw + xMin) * 4 + channel;
        maxIndex = (yMax * sw + xMax) * 4 + channel;
        const vMax = interpolate(sx, xMin, sourceData[minIndex], xMax, sourceData[maxIndex]);
        destData[destIndex + channel] = interpolate(y, yMin, vMin, yMax, vMax);
    }
};
/**
 * Copyright (c) 2015 Guyon Roche
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ 
//# sourceMappingURL=index.js.map