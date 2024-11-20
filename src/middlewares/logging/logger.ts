import { pinoHttp } from "pino-http";
import { pino } from "pino";
import { randomUUID } from "crypto";
import express, { Request, Response } from "express";
import http from "http";

export class Logger {
  static logger = pinoHttp({
    logger: pino(),

    // Generate a unique request ID
    genReqId: (req: Request, res: Response) => {
      const existingID = req.headers["x-request-id"] || randomUUID();
      res.setHeader("X-Request-Id", existingID as string);
      return existingID;
    },

    // Serialize request and response to include custom fields
    serializers: {
      req(req: Request) {
        return {
          id: req.id,
          method: req.method,
          url: req.url,
          query: req.query,
          params: req.params,
          headers: req.headers,
          remoteAddress: req.socket?.remoteAddress,
          remotePort: req.socket?.remotePort,
        };
      },
      res(res: Response) {
        return {
          status: res.statusCode,
        };
      },
    },

    // Add custom properties to the log
    customProps: (req: Request, res: Response) => {
      return {
        reqTimestamp: new Date().toISOString(),
        resTimestamp: new Date().toISOString(),
      };
    },

    // Custom log level for responses
    customLogLevel(req: Request, res: Response, err?: Error) {
      if (res.statusCode >= 500 || err) return "error";
      if (res.statusCode >= 400) return "warn";
      return "info";
    },
  });
}
