import workerStandardDeviation from 'workerize-loader!./workerStandartDeviation'  // eslint-disable-line import/no-webpack-loader-syntax
import workerAverage from 'workerize-loader!./workerAverage'  // eslint-disable-line import/no-webpack-loader-syntax
import workerMode from 'workerize-loader!./workerMode' // eslint-disable-line import/no-webpack-loader-syntax
import workerMedian from 'workerize-loader!./workerMedian'  // eslint-disable-line import/no-webpack-loader-syntax

const instanceWorkerMedian = workerMedian();
const instanceWorkerMode = workerMode();
const instanceWorkerAverage = workerAverage();
const instanceWorkerStandardDeviation = workerStandardDeviation();

export const getStandardDeviationPromise = (data) => new Promise((resolve) => resolve(instanceWorkerStandardDeviation.getStandardDeviation(data)))
export const getAveragePromise = (data) => new Promise((resolve) => resolve(instanceWorkerAverage.getAverage(data)))
export const getModePromise = (data) => new Promise((resolve) => resolve(instanceWorkerMode.getMode(data)))
export const getMedianPromise = (data) => new Promise((resolve) => resolve(instanceWorkerMedian.getMedian(data)))
