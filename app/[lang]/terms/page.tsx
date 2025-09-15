import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Scale, Shield, AlertTriangle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function TermsPage() {
  const t = await getTranslations('Terms');

  return (
    <div className="py-8">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50 mb-4">
              <FileText className="w-4 h-4 mr-2" />
              {t('header.badge')}
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              {t('header.title')}
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('header.description')}
            </p>
          </div>

          <div className="space-y-8">
            {/* Acceptance of Terms */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Scale className="h-5 w-5 text-cyan-400 mr-2" />
                  {t('acceptance.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="text-gray-300 space-y-4">
                  <p>
                    {t('acceptance.intro1')}
                  </p>
                  <p>
                    {t('acceptance.intro2')}
                  </p>
                  
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                    <p className="text-cyan-400 text-sm">
                      {t('acceptance.important')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Use of Service */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">{t('use.title')}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="text-gray-300 space-y-4">
                  <h4 className="text-white font-semibold">{t('use.permitted.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('use.permitted.list.0')}</li>
                    <li>{t('use.permitted.list.1')}</li>
                    <li>{t('use.permitted.list.2')}</li>
                    <li>{t('use.permitted.list.3')}</li>
                  </ul>
                  
                  <h4 className="text-white font-semibold">{t('use.prohibited.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('use.prohibited.list.0')}</li>
                    <li>{t('use.prohibited.list.1')}</li>
                    <li>{t('use.prohibited.list.2')}</li>
                    <li>{t('use.prohibited.list.3')}</li>
                    <li>{t('use.prohibited.list.4')}</li>
                    <li>{t('use.prohibited.list.5')}</li>
                  </ul>
                  
                  <h4 className="text-white font-semibold">{t('use.age')}</h4>
                  <p>
                    {t('use.ageText')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cryptocurrency Payments */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 text-cyan-400 mr-2" />
                  {t('payments.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="text-gray-300 space-y-4">
                  <h4 className="text-white font-semibold">{t('payments.processing.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('payments.processing.list.0')}</li>
                    <li>{t('payments.processing.list.1')}</li>
                    <li>{t('payments.processing.list.2')}</li>
                    <li>{t('payments.processing.list.3')}</li>
                  </ul>
                  
                  <h4 className="text-white font-semibold">{t('payments.terms.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('payments.terms.list.0')}</li>
                    <li>{t('payments.terms.list.1')}</li>
                    <li>{t('payments.terms.list.2')}</li>
                    <li>{t('payments.terms.list.3')}</li>
                  </ul>
                  
                  <h4 className="text-white font-semibold">{t('payments.risks')}</h4>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <p className="text-yellow-400 text-sm">
                      {t('payments.warning')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Orders and Shipping */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">{t('orders.title')}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="text-gray-300 space-y-4">
                  <h4 className="text-white font-semibold">{t('orders.processing.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('orders.processing.list.0')}</li>
                    <li>{t('orders.processing.list.1')}</li>
                    <li>{t('orders.processing.list.2')}</li>
                    <li>{t('orders.processing.list.3')}</li>
                  </ul>
                  
                  <h4 className="text-white font-semibold">{t('orders.shipping.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('orders.shipping.list.0')}</li>
                    <li>{t('orders.shipping.list.1')}</li>
                    <li>{t('orders.shipping.list.2')}</li>
                    <li>{t('orders.shipping.list.3')}</li>
                    <li>{t('orders.shipping.list.4')}</li>
                  </ul>
                  
                  <h4 className="text-white font-semibold">{t('orders.delivery.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('orders.delivery.list.0')}</li>
                    <li>{t('orders.delivery.list.1')}</li>
                    <li>{t('orders.delivery.list.2')}</li>
                    <li>{t('orders.delivery.list.3')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Returns and Refunds */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">{t('returns.title')}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="text-gray-300 space-y-4">
                  <h4 className="text-white font-semibold">{t('returns.policy.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('returns.policy.list.0')}</li>
                    <li>{t('returns.policy.list.1')}</li>
                    <li>{t('returns.policy.list.2')}</li>
                    <li>{t('returns.policy.list.3')}</li>
                  </ul>
                  
                  <h4 className="text-white font-semibold">{t('returns.process.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('returns.process.list.0')}</li>
                    <li>{t('returns.process.list.1')}</li>
                    <li>{t('returns.process.list.2')}</li>
                    <li>{t('returns.process.list.3')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Liability and Disclaimers */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="h-5 w-5 text-cyan-400 mr-2" />
                  {t('liability.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="text-gray-300 space-y-4">
                  <h4 className="text-white font-semibold">{t('liability.availability')}</h4>
                  <p>
                    {t('liability.availabilityText')}
                  </p>
                  
                  <h4 className="text-white font-semibold">{t('liability.limitation')}</h4>
                  <p>
                    {t('liability.limitationText')}
                  </p>
                  
                  <h4 className="text-white font-semibold">{t('liability.cryptoRisks')}</h4>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-red-400 text-sm">
                      {t('liability.warning')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">{t('contact.title')}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="text-gray-300 space-y-4">
                  <p>
                    {t('contact.intro')}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold">{t('contact.email')}</h4>
                      <p>{t('contact.emailValue')}</p>
                      
                      <h4 className="text-white font-semibold mt-4">{t('contact.address')}</h4>
                      <p>
                        {t('contact.addressValue')}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold">{t('contact.phone')}</h4>
                      <p>{t('contact.phoneValue')}</p>
                      
                      <h4 className="text-white font-semibold mt-4">{t('contact.hours')}</h4>
                      <p>{t('contact.hoursValue')}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">
                      {t('contact.updateNote')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}