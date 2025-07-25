
import { SEOHelmet } from "@/components/SEOHelmet";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Shield, AlertTriangle, Gavel } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  const { t } = useLanguage();

  return (
    <>
      <SEOHelmet
        title="Terms of Service - Zwanski Tech"
        description="Terms and conditions for using Zwanski Tech services and platform."
        canonical="https://zwanski.org/terms-of-service"
      />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                Terms of <span className="text-gradient">Service</span>
              </h1>
              <p className="text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Acceptance of Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    By accessing and using Zwanski Tech services, you accept and agree to be bound by these Terms of Service. 
                    If you do not agree to these terms, please do not use our services.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Accounts and Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <h3>Account Registration</h3>
                  <ul>
                    <li>You must provide accurate and complete information</li>
                    <li>You are responsible for maintaining account security</li>
                    <li>One person may only create one account</li>
                    <li>You must be at least 16 years old to create an account</li>
                  </ul>

                  <h3>User Conduct</h3>
                  <ul>
                    <li>Use services in a lawful and respectful manner</li>
                    <li>Do not share inappropriate, harmful, or illegal content</li>
                    <li>Respect intellectual property rights</li>
                    <li>Do not attempt to hack or disrupt our services</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Services and Availability
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <h3>Our Services Include</h3>
                  <ul>
                    <li>Web and mobile development services</li>
                    <li>Educational content and courses</li>
                    <li>Job marketplace for freelancers and employers</li>
                    <li>Free tools (IMEI checker, computer model lookup)</li>
                    <li>Technical consulting and support</li>
                  </ul>

                  <h3>Service Availability</h3>
                  <ul>
                    <li>We strive for 99% uptime but cannot guarantee uninterrupted service</li>
                    <li>Maintenance may occasionally require temporary service interruption</li>
                    <li>We reserve the right to modify or discontinue services</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gavel className="h-5 w-5" />
                    Intellectual Property
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <ul>
                    <li>All content and materials on our platform are protected by copyright</li>
                    <li>You retain rights to content you create and share</li>
                    <li>You grant us license to use your content to provide our services</li>
                    <li>Respect third-party intellectual property rights</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Limitation of Liability
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    Zwanski Tech provides services "as is" without warranties. We are not liable for:
                  </p>
                  <ul>
                    <li>Indirect, incidental, or consequential damages</li>
                    <li>Loss of data, profits, or business opportunities</li>
                    <li>Actions of third-party users on our platform</li>
                    <li>Technical issues beyond our reasonable control</li>
                  </ul>
                  <p>
                    Our total liability is limited to the amount you paid for our services in the past 12 months.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>For questions about these Terms of Service:</p>
                  <ul>
                    <li><strong>Email:</strong> support@zwanski.org</li>
                    <li><strong>Address:</strong> Tunis, Tunisia</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
