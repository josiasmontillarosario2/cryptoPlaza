import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CreditCard, Package, Clock } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function RefundsPage() {
  const t = await getTranslations('Refunds');

  return (
    <div className="py-8">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50 mb-4">
              <Clock className="w-4 h-4 mr-2" />
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
            {/* Eligibility */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Package className="h-5 w-5 text-cyan-400 mr-2" />
                  {t('eligibility.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="text-gray-300 space-y-4">
                  <p>
                    {t('eligibility.intro')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('eligibility.list.0')}</li>
                    <li>{t('eligibility.list.1')}</li>
                    <li>{t('eligibility.list.2')}</li>
                    <li>{t('eligibility.list.3')}</li>
                    <li>{t('eligibility.list.4')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Process */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="h-5 w-5 text-cyan-400 mr-2" />
                  {t('process.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="text-gray-300 space-y-4">
                  <p>
                    {t('process.intro')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('process.list.0')}</li>
                    <li>{t('process.list.1')}</li>
                    <li>{t('process.list.2')}</li>
                    <li>{t('process.list.3')}</li>
                    <li>{t('process.list.4')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Crypto Refunds */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="h-5 w-5 text-cyan-400 mr-2" />
                  {t('crypto.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="text-gray-300 space-y-4">
                  <p>
                    {t('crypto.intro')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('crypto.list.0')}</li>
                    <li>{t('crypto.list.1')}</li>
                    <li>{t('crypto.list.2')}</li>
                    <li>{t('crypto.list.3')}</li>
                    <li>{t('crypto.list.4')}</li>
                  </ul>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <p className="text-yellow-400 text-sm">
                      {t('crypto.warning')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Limitations */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="h-5 w-5 text-cyan-400 mr-2" />
                  {t('limitations.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="text-gray-300 space-y-4">
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('limitations.list.0')}</li>
                    <li>{t('limitations.list.1')}</li>
                    <li>{t('limitations.list.2')}</li>
                    <li>{t('limitations.list.3')}</li>
                    <li>{t('limitations.list.4')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">{t('contact.title')}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="text-gray-300 space-y-4">
                  <p>
                    {t('contact.intro')}
                  </p>
                  <p>{t('contact.email')}</p>
                  <p>{t('contact.response')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}