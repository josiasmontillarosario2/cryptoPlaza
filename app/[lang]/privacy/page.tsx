import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function PrivacyPage() {
  const t = await getTranslations('Privacy');

  return (
    <div className="py-8">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50 mb-4">
              <Shield className="w-4 h-4 mr-2" />
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
            {/* Information We Collect */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Eye className="h-5 w-5 text-cyan-400 mr-2" />
                  {t('collect.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="text-gray-300 space-y-4">
                  <p>
                    {t('collect.intro')}
                  </p>
                  
                  <h4 className="text-white font-semibold">{t('collect.personal.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('collect.personal.list.0')}</li>
                    <li>{t('collect.personal.list.1')}</li>
                    <li>{t('collect.personal.list.2')}</li>
                    <li>{t('collect.personal.list.3')}</li>
                  </ul>
                  
                  <h4 className="text-white font-semibold">{t('collect.automatic.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('collect.automatic.list.0')}</li>
                    <li>{t('collect.automatic.list.1')}</li>
                    <li>{t('collect.automatic.list.2')}</li>
                    <li>{t('collect.automatic.list.3')}</li>
                  </ul>
                  
                  <h4 className="text-white font-semibold">{t('collect.crypto.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('collect.crypto.list.0')}</li>
                    <li>{t('collect.crypto.list.1')}</li>
                    <li>{t('collect.crypto.list.2')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="h-5 w-5 text-cyan-400 mr-2" />
                  {t('use.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="text-gray-300 space-y-4">
                  <p>
                    {t('use.intro')}
                  </p>
                  
                  <h4 className="text-white font-semibold">{t('use.service.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('use.service.list.0')}</li>
                    <li>{t('use.service.list.1')}</li>
                    <li>{t('use.service.list.2')}</li>
                    <li>{t('use.service.list.3')}</li>
                  </ul>
                  
                  <h4 className="text-white font-semibold">{t('use.improvement.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('use.improvement.list.0')}</li>
                    <li>{t('use.improvement.list.1')}</li>
                    <li>{t('use.improvement.list.2')}</li>
                    <li>{t('use.improvement.list.3')}</li>
                  </ul>
                  
                  <h4 className="text-white font-semibold">{t('use.communication.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('use.communication.list.0')}</li>
                    <li>{t('use.communication.list.1')}</li>
                    <li>{t('use.communication.list.2')}</li>
                    <li>{t('use.communication.list.3')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Lock className="h-5 w-5 text-cyan-400 mr-2" />
                  {t('protection.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="text-gray-300 space-y-4">
                  <p>
                    {t('protection.intro')}
                  </p>
                  
                  <h4 className="text-white font-semibold">{t('protection.technical.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('protection.technical.list.0')}</li>
                    <li>{t('protection.technical.list.1')}</li>
                    <li>{t('protection.technical.list.2')}</li>
                    <li>{t('protection.technical.list.3')}</li>
                  </ul>
                  
                  <h4 className="text-white font-semibold">{t('protection.operational.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('protection.operational.list.0')}</li>
                    <li>{t('protection.operational.list.1')}</li>
                    <li>{t('protection.operational.list.2')}</li>
                    <li>{t('protection.operational.list.3')}</li>
                  </ul>
                  
                  <h4 className="text-white font-semibold">{t('protection.payment.title')}</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>{t('protection.payment.list.0')}</li>
                    <li>{t('protection.payment.list.1')}</li>
                    <li>{t('protection.payment.list.2')}</li>
                    <li>{t('protection.payment.list.3')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">{t('rights.title')}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="text-gray-300 space-y-4">
                  <p>
                    {t('rights.intro')}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold">{t('rights.access.title')}</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                        <li>{t('rights.access.list.0')}</li>
                        <li>{t('rights.access.list.1')}</li>
                        <li>{t('rights.access.list.2')}</li>
                        <li>{t('rights.access.list.3')}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold">{t('rights.settings.title')}</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                        <li>{t('rights.settings.list.0')}</li>
                        <li>{t('rights.settings.list.1')}</li>
                        <li>{t('rights.settings.list.2')}</li>
                        <li>{t('rights.settings.list.3')}</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                    <p className="text-cyan-400 text-sm">
                      {t('rights.help')}
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
                      <h4 className="text-white font-semibold">{t('contact.responseTime')}</h4>
                      <p>{t('contact.responseValue')}</p>
                      
                      <h4 className="text-white font-semibold mt-4">{t('contact.dpo')}</h4>
                      <p>{t('contact.dpoValue')}</p>
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