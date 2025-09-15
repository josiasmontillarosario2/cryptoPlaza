import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getCurrentUser, getUserOrders } from '@/lib/mock-data';
import { User, Package, Settings, LogOut, ShoppingBag, Calendar, DollarSign } from 'lucide-react';

export default function AccountPage() {
  const user = getCurrentUser();
  const orders = user ? getUserOrders(user.id) : [];

  if (!user) {
    return (
      <div className="py-16">
        <Container>
          <div className="text-center max-w-md mx-auto">
            <User className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Please Sign In</h1>
            <p className="text-gray-400 mb-8">
              You need to be signed in to view your account.
            </p>
            <Link href="/auth">
              <Button className="bg-cyan-600 hover:bg-cyan-500 text-black font-semibold">
                Sign In
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="py-8">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Account</h1>
          <p className="text-gray-400">Manage your crypto shopping experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-6 text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4 bg-cyan-500">
                  <AvatarFallback className="text-black font-bold text-xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-white mb-1">{user.name}</h3>
                <p className="text-sm text-gray-400">{user.email}</p>
                <Badge className="mt-2 bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
                  Crypto Pioneer
                </Badge>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-cyan-400 bg-cyan-500/10">
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-cyan-400">
                    <Package className="h-4 w-4 mr-3" />
                    Orders
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-cyan-400">
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Button>
                  <Separator className="bg-gray-800" />
                  <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300">
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-gray-800 bg-gray-900/50">
                <CardContent className="p-6 text-center">
                  <ShoppingBag className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{orders.length}</div>
                  <div className="text-sm text-gray-400">Total Orders</div>
                </CardContent>
              </Card>
              
              <Card className="border-gray-800 bg-gray-900/50">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">${totalSpent.toFixed(2)}</div>
                  <div className="text-sm text-gray-400">Total Spent</div>
                </CardContent>
              </Card>
              
              <Card className="border-gray-800 bg-gray-900/50">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">Jan 2024</div>
                  <div className="text-sm text-gray-400">Member Since</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Recent Orders
                  <Link href="/shop">
                    <Button variant="outline" size="sm" className="border-cyan-500/50 text-cyan-400">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">No orders yet</h3>
                    <p className="text-gray-400 mb-6">Start shopping to see your orders here</p>
                    <Link href="/shop">
                      <Button className="bg-cyan-600 hover:bg-cyan-500 text-black">
                        Browse Products
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-gray-800 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                            <Package className="h-6 w-6 text-cyan-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">Order #{order.id}</div>
                            <div className="text-sm text-gray-400">
                              {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold text-cyan-400">${order.total.toFixed(2)}</div>
                          <Badge 
                            className={`${
                              order.status === 'confirmed' 
                                ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                                : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                            }`}
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Crypto Wallet Info */}
            <Card className="border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">Crypto Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-orange-400 font-bold">BTC</div>
                    <div className="text-xs text-gray-400 mt-1">0.0245</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-blue-400 font-bold">ETH</div>
                    <div className="text-xs text-gray-400 mt-1">1.2345</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-green-400 font-bold">USDC</div>
                    <div className="text-xs text-gray-400 mt-1">500.00</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <Button variant="ghost" size="sm" className="text-cyan-400 hover:bg-cyan-500/10">
                      + Add Wallet
                    </Button>
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