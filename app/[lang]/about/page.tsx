import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/app/i18n/navigation'; // Usa esto para enlaces localizados (de navigation.ts); si no, usa 'next/link'
import { 
  Shield, 
  Globe, 
  Zap, 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  Heart,
  ArrowRight 
} from 'lucide-react';

export default async function AboutPage() {
  const t = await getTranslations('About'); // Namespace 'About'

  return (
    <div className="py-8">
      <Container>
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50 mb-4">
            <Zap className="w-4 h-4 mr-2" />
            {t('hero.badge')}
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            {t('hero.titlePart1')}
            <br />
            <span className="text-cyan-400">{t('hero.titlePart2')}</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="border-gray-800 bg-gray-900/50 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-cyan-400 mb-2">50K+</div>
              <div className="text-sm text-gray-400">{t('stats.customers')}</div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-800 bg-gray-900/50 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-cyan-400 mb-2">15+</div>
              <div className="text-sm text-gray-400">{t('stats.cryptocurrencies')}</div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-800 bg-gray-900/50 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-cyan-400 mb-2">100+</div>
              <div className="text-sm text-gray-400">{t('stats.countries')}</div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-800 bg-gray-900/50 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
              <div className="text-sm text-gray-400">{t('stats.support')}</div>
            </CardContent>
          </Card>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              {t('mission.title')}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {t('mission.description1')}
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {t('mission.description2')}
            </p>
            <Link href="/shop">
              <Button className="bg-cyan-600 hover:bg-cyan-500 text-black font-semibold">
                {t('mission.button')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">{t('missionCards.innovationTitle')}</h3>
                <p className="text-sm text-gray-400">
                  {t('missionCards.innovationDesc')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">{t('missionCards.securityTitle')}</h3>
                <p className="text-sm text-gray-400">
                  {t('missionCards.securityDesc')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">{t('missionCards.globalTitle')}</h3>
                <p className="text-sm text-gray-400">
                  {t('missionCards.globalDesc')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">{t('missionCards.communityTitle')}</h3>
                <p className="text-sm text-gray-400">
                  {t('missionCards.communityDesc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            {t('values.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center">
                <TrendingUp className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white">{t('values.transparencyTitle')}</h3>
              <p className="text-gray-400">
                {t('values.transparencyDesc')}
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">{t('values.excellenceTitle')}</h3>
              <p className="text-gray-400">
                {t('values.excellenceDesc')}
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <Heart className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white">{t('values.communityTitle')}</h3>
              <p className="text-gray-400">
                {t('values.communityDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            {t('team.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-gray-800 bg-gray-900/50 text-center">
              <CardContent className="p-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-black">SK</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('team.sarahName')}</h3>
                <p className="text-cyan-400 text-sm mb-3">{t('team.sarahRole')}</p>
                <p className="text-gray-400 text-sm">
                  {t('team.sarahDesc')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-800 bg-gray-900/50 text-center">
              <CardContent className="p-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">MR</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('team.marcusName')}</h3>
                <p className="text-cyan-400 text-sm mb-3">{t('team.marcusRole')}</p>
                <p className="text-gray-400 text-sm">
                  {t('team.marcusDesc')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-800 bg-gray-900/50 text-center">
              <CardContent className="p-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-black">AL</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('team.alexName')}</h3>
                <p className="text-cyan-400 text-sm mb-3">{t('team.alexRole')}</p>
                <p className="text-gray-400 text-sm">
                  {t('team.alexDesc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl border border-cyan-500/20 p-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('cta.titlePart1')} <span className="text-cyan-400">{t('cta.titlePart2')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-semibold px-8">
                {t('cta.startShopping')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8">
                {t('cta.contactUs')}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}