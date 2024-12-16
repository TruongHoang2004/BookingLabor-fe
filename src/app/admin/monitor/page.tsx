'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Progress, Tooltip } from "@nextui-org/react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Chip } from "@nextui-org/react";
import { 
    Cpu, 
    Users, 
    AlertTriangle, 
    Clock, 
    Shield, 
    Globe,
    Activity,
    Database
} from "lucide-react";
import { ProtectedRoute } from '@/components/protectedRoute';

interface MonitoringMetrics {
    pageLoadTime: number;
    activeUsers: number;
    errorRate: number;
    serverResponseTime: number;
    securityScore: number;
    uptime: number;
    trafficLoad: number;
    databaseQueries: number;
}

interface SystemEvent {
    id: string;
    type: string;
    description: string;
    timestamp: string;
    status: "success" | "warning" | "error";
}


const WebsiteMonitor: React.FC = () => {
    const [metrics, setMetrics] = useState<MonitoringMetrics>({
        pageLoadTime: 0,
        activeUsers: 0,
        errorRate: 0,
        serverResponseTime: 0,
        securityScore: 0,
        uptime: 0,
        trafficLoad: 0,
        databaseQueries: 0
    });

    useEffect(() => {
        const fetchMetrics = () => {
            // Simulate fetching metrics
            setMetrics({
                pageLoadTime: Math.random() * 5,
                activeUsers: Math.floor(Math.random() * 1000),
                errorRate: Math.random() * 5,
                serverResponseTime: Math.random() * 1000,
                securityScore: Math.random() * 100,
                uptime: 99.9,
                trafficLoad: Math.random() * 100,
                databaseQueries: Math.floor(Math.random() * 1000)
            });
        };

        fetchMetrics();
        const interval = setInterval(fetchMetrics, 5000);
        return () => clearInterval(interval);
    }, []);

const systemEvents: SystemEvent[] = [
        {
            id: "1",
            type: "Server Restart",
            description: "System maintenance completed",
            timestamp: "2024-03-20 10:30:45",
            status: "success"
        },
        {
            id: "2",
            type: "High CPU Usage",
            description: "CPU usage exceeded 80%",
            timestamp: "2024-03-20 09:15:22",
            status: "warning"
        },
        {
            id: "3",
            type: "Failed Login",
            description: "Multiple failed login attempts detected",
            timestamp: "2024-03-20 08:45:10",
            status: "error"
        }
    ];
    return (
        <ProtectedRoute>
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Website Monitoring Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
                <Card>
                    <CardHeader className="flex gap-3">
                        <Clock size={24} />
                        <p className="text-lg font-semibold">Page Load Time</p>
                    </CardHeader>
                    <CardBody>
                        <Tooltip content="Average page load time in seconds">
                            <div className="text-2xl font-bold text-center">
                                {metrics.pageLoadTime.toFixed(2)}s
                            </div>
                        </Tooltip>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader className="flex gap-3">
                        <Users size={24} />
                        <p className="text-lg font-semibold">Active Users</p>
                    </CardHeader>
                    <CardBody>
                        <div className="text-2xl font-bold text-center">
                            {metrics.activeUsers}
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader className="flex gap-3">
                        <AlertTriangle size={24} />
                        <p className="text-lg font-semibold">Error Rate</p>
                    </CardHeader>
                    <CardBody>
                        <div className="text-2xl font-bold text-center text-danger">
                            {metrics.errorRate.toFixed(2)}%
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader className="flex gap-3">
                        <Activity size={24} />
                        <p className="text-lg font-semibold">Server Response</p>
                    </CardHeader>
                    <CardBody>
                        <div className="text-2xl font-bold text-center">
                            {metrics.serverResponseTime.toFixed(0)}ms
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader className="flex gap-3">
                        <Shield size={24} />
                        <p className="text-lg font-semibold">Security Score</p>
                    </CardHeader>
                    <CardBody>
                        <Progress 
                            value={metrics.securityScore} 
                            color={metrics.securityScore > 80 ? "success" : "warning"}
                            showValueLabel
                        />
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader className="flex gap-3">
                        <Globe size={24} />
                        <p className="text-lg font-semibold">Uptime</p>
                    </CardHeader>
                    <CardBody>
                        <div className="text-2xl font-bold text-center text-success">
                            {metrics.uptime}%
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader className="flex gap-3">
                        <Cpu size={24} />
                        <p className="text-lg font-semibold">Traffic Load</p>
                    </CardHeader>
                    <CardBody>
                        <Progress 
                            value={metrics.trafficLoad} 
                            color={metrics.trafficLoad > 80 ? "danger" : "success"}
                            showValueLabel
                        />
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader className="flex gap-3">
                        <Database size={24} />
                        <p className="text-lg font-semibold">DB Queries/min</p>
                    </CardHeader>
                    <CardBody>
                        <div className="text-2xl font-bold text-center">
                            {metrics.databaseQueries}
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="mt-8 max-w-7xl mx-auto">
                <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">System Activities</h2>
                    <Table aria-label="System activities table">
                        <TableHeader>
                            <TableColumn>TYPE</TableColumn>
                            <TableColumn>DESCRIPTION</TableColumn>
                            <TableColumn>TIMESTAMP</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {systemEvents.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell>{event.type}</TableCell>
                                    <TableCell>{event.description}</TableCell>
                                    <TableCell>{event.timestamp}</TableCell>
                                    <TableCell>
                                        <Chip
                                            color={
                                                event.status === "success" ? "success" :
                                                event.status === "warning" ? "warning" : "danger"
                                            }
                                            size="sm"
                                        >
                                            {event.status}
                                        </Chip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>

                <Card className="mt-6 p-6">
                    <h2 className="text-2xl font-bold mb-4">Performance Reports</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Peak Hours</h3>
                            <p className="text-gray-600">10:00 AM - 2:00 PM</p>
                            <p className="text-sm text-gray-500">Highest user activity period</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Resource Usage</h3>
                            <p className="text-gray-600">CPU: 65% | Memory: 78%</p>
                            <p className="text-sm text-gray-500">Average over last 24 hours</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Error Summary</h3>
                            <p className="text-gray-600">Total Errors: 23</p>
                            <p className="text-sm text-gray-500">Last 24 hours</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Response Time</h3>
                            <p className="text-gray-600">Avg: 245ms</p>
                            <p className="text-sm text-gray-500">95th percentile: 450ms</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
     </ProtectedRoute>                       
        
    );
};

export default WebsiteMonitor;