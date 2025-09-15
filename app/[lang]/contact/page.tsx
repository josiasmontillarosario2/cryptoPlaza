'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  Headphones,
  Shield,
  Zap
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert(t('form.successMessage'));
    }, 2000);
  };

  return (
    <div className="py-8">
      <Container>
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50 mb-4">
            <Headphones className="w-4 h-4 mr-2" />
            {t('hero.badge')}
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            {t('hero.title')}
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Send className="h-5 w-5 text-cyan-400 mr-2" />
                  {t('form.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-300">{t('form.firstName')}</Label>
                      <Input
                        id="firstName"
                        placeholder="Satoshi"
                        className="mt-1 bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-300">{t('form.lastName')}</Label>
                      <Input
                        id="lastName"
                        placeholder="Nakamoto"
                        className="mt-1 bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-300">{t('form.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="satoshi@example.com"
                      className="mt-1 bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-gray-300">{t('form.subject')}</Label>
                    <Select>
                      <SelectTrigger className="mt-1 bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="order">{t('form.subjectOptions.order')}</SelectItem>
                        <SelectItem value="product">{t('form.subjectOptions.product')}</SelectItem>
                        <SelectItem value="payment">{t('form.subjectOptions.payment')}</SelectItem>
                        <SelectItem value="technical">{t('form.subjectOptions.technical')}</SelectItem>
                        <SelectItem value="partnership">{t('form.subjectOptions.partnership')}</SelectItem>
                        <SelectItem value="other">{t('form.subjectOptions.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-gray-300">{t('form.message')}</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      className="mt-1 bg-gray-800 border-gray-700 text-white resize-none"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-6"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                        {t('form.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t('form.button')}
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    {t('form.responseTime')}
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">{t('quickContact.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t('quickContact.email')}</div>
                    <div className="text-gray-400">{t('quickContact.emailValue')}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t('quickContact.liveChat')}</div>
                    <div className="text-gray-400">{t('quickContact.liveChatValue')}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t('quickContact.whatsapp')}</div>
                    <div className="text-gray-400">{t('quickContact.whatsappValue')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Info */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">{t('office.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mt-1">
                    <MapPin className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t('office.address')}</div>
                    <div className="text-gray-400">
                      {t('office.addressValue')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mt-1">
                    <Clock className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t('office.hours')}</div>
                    <div className="text-gray-400 space-y-1">
                      <div>{t('office.mondayFriday')}</div>
                      <div>{t('office.saturday')}</div>
                      <div>{t('office.sunday')}</div>
                      <div className="text-cyan-400 text-sm">
                        {t('office.supportNote')}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Guarantees */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">{t('promise.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-cyan-400" />
                  <span className="text-gray-300">{t('promise.response')}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  <span className="text-gray-300">{t('promise.secure')}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Headphones className="h-5 w-5 text-cyan-400" />
                  <span className="text-gray-300">{t('promise.expert')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}