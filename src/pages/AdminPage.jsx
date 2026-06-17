import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminPage.module.css';
import { getPosts, createPost, updatePost, deletePost } from '../services/api';

// Import actual product images to display in tables
import m_p1 from '../assets/clothing-styles/style-2.jpg';
import m_p2 from '../assets/clothing-styles/style-6.jpg';
import m_p3 from '../assets/clothing-styles/style-3.jpg';
import m_p4 from '../assets/clothing-styles/style5.jpg';

import w_p1 from '../assets/clothing-styles/wm-2.jpg';
import w_p2 from '../assets/clothing-styles/wm4.jpg';
import w_p3 from '../assets/clothing-styles/wm-3.jpg';
import w_p4 from '../assets/clothing-styles/wm-5.jpg';

import k_p1 from '../assets/clothing-styles/kid-6.jpg';
import k_p2 from '../assets/clothing-styles/kid-3.jpg';
import k_p3 from '../assets/clothing-styles/kid-5.jpg';
import k_p4 from '../assets/clothing-styles/kid-4.jpg';

// Initial Mock Products Data matching pages
const INITIAL_PRODUCTS = [
  { id: 'm1', designer: 'VIVIENNE WESTWOOD', title: 'Rock the Season', name: 'VIVIENNE WESTWOOD - Rock the Season', price: 890, category: 'men', stock: 50, image: m_p1 },
  { id: 'm2', designer: 'BRUNELLO CUCINELLI BARBOUR', title: 'Unexpected Pairing', name: 'BRUNELLO CUCINELLI BARBOUR - Unexpected Pairing', price: 1250, category: 'men', stock: 50, image: m_p2 },
  { id: 'm3', designer: 'MAISON KITSUNÉ X BARBOUR', title: 'Cold Season, New Wardrobe', name: 'MAISON KITSUNÉ X BARBOUR - Cold Season, New Wardrobe', price: 620, category: 'men', stock: 50, image: m_p3 },
  { id: 'm4', designer: '3PARADIS', title: 'Empower Your Wardrobe', name: '3PARADIS - Empower Your Wardrobe', price: 480, category: 'men', stock: 50, image: m_p4 },
  
  { id: 'w1', designer: 'VICTORIA BECKHAM', title: 'New look to discover', name: 'VICTORIA BECKHAM - New look to discover', price: 1100, category: 'women', stock: 50, image: w_p1 },
  { id: 'w2', designer: 'RENE CAOVILLA', title: 'Highlighted Shoes', name: 'RENE CAOVILLA - Highlighted Shoes', price: 780, category: 'women', stock: 50, image: w_p2 },
  { id: 'w3', designer: 'BAGS', title: 'Bags to Invest in', name: 'BAGS - Bags to Invest in', price: 950, category: 'women', stock: 50, image: w_p3 },
  { id: 'w4', designer: 'KHAITE', title: 'Cold Season, New Wardrobe', name: 'KHAITE - Cold Season, New Wardrobe', price: 1350, category: 'women', stock: 50, image: w_p4 },
  
  { id: 'k1', designer: 'VERSACE F/W 23', title: 'All New Arrivals for her', name: 'VERSACE F/W 23 - All New Arrivals for her', price: 220, category: 'kids', stock: 50, image: k_p1 },
  { id: 'k2', designer: 'KENZO KIDS F/W 23', title: 'Sports Jackets', name: 'KENZO KIDS F/W 23 - Sports Jackets', price: 180, category: 'kids', stock: 50, image: k_p2 },
  { id: 'k3', designer: 'SWEATERS EDIT', title: 'Fall is Coming', name: 'SWEATERS EDIT - Fall is Coming', price: 195, category: 'kids', stock: 50, image: k_p3 },
  { id: 'k4', designer: 'CANADA GOOSE F/W 23', title: 'All New Arrivals for him', name: 'CANADA GOOSE F/W 23 - All New Arrivals for him', price: 165, category: 'kids', stock: 50, image: k_p4 }
];

// Initial Mock Orders Data
const INITIAL_ORDERS = [
  { id: 'ORD-001', customerName: 'John Doe', email: 'john@example.com', items: 'VIVIENNE WESTWOOD (M) × 1', total: 890, paymentMethod: 'Credit/Debit Card', status: 'Pending', date: '2026-05-10' },
  { id: 'ORD-002', customerName: 'Jane Smith', email: 'jane@example.com', items: 'RENE CAOVILLA (S) × 1', total: 780, paymentMethod: 'PayPal', status: 'Processing', date: '2026-05-15' },
  { id: 'ORD-003', customerName: 'Robert Johnson', email: 'robert@example.com', items: 'VERSACE F/W 23 (XS) × 2', total: 440, paymentMethod: 'Bank Transfer', status: 'Shipped', date: '2026-05-20' },
  { id: 'ORD-004', customerName: 'Emily Davis', email: 'emily@example.com', items: 'KHAITE (M) × 1', total: 1350, paymentMethod: 'Credit/Debit Card', status: 'Delivered', date: '2026-05-25' },
  { id: 'ORD-005', customerName: 'Michael Brown', email: 'michael@example.com', items: '3PARADIS (L) × 1, CANADA GOOSE F/W 23 (XL) × 1', total: 645, paymentMethod: 'PayPal', status: 'Cancelled', date: '2026-05-28' },
  { id: 'ORD-006', customerName: 'Sarah Wilson', email: 'sarah@example.com', items: 'VICTORIA BECKHAM (S) × 1', total: 1100, paymentMethod: 'Credit/Debit Card', status: 'Processing', date: '2026-06-01' },
  { id: 'ORD-007', customerName: 'David Taylor', email: 'david@example.com', items: 'MAISON KITSUNÉ X BARBOUR (M) × 1, KENZO KIDS F/W 23 (XS) × 1', total: 800, paymentMethod: 'Bank Transfer', status: 'Pending', date: '2026-06-05' },
  { id: 'ORD-008', customerName: 'Jessica Miller', email: 'jessica@example.com', items: 'BAGS (L) × 1', total: 950, paymentMethod: 'Credit/Debit Card', status: 'Delivered', date: '2026-06-07' }
];

// Initial Mock Customers Data
const INITIAL_CUSTOMERS = [
  { id: 'CUST-001', name: 'John Doe', email: 'john@example.com', totalOrders: 1, totalSpent: 890, joinedDate: '2026-01-15' },
  { id: 'CUST-002', name: 'Jane Smith', email: 'jane@example.com', totalOrders: 1, totalSpent: 780, joinedDate: '2026-02-18' },
  { id: 'CUST-003', name: 'Robert Johnson', email: 'robert@example.com', totalOrders: 1, totalSpent: 440, joinedDate: '2026-03-02' },
  { id: 'CUST-004', name: 'Emily Davis', email: 'emily@example.com', totalOrders: 1, totalSpent: 1350, joinedDate: '2026-03-22' },
  { id: 'CUST-005', name: 'Michael Brown', email: 'michael@example.com', totalOrders: 1, totalSpent: 645, joinedDate: '2026-04-10' },
  { id: 'CUST-006', name: 'Sarah Wilson', email: 'sarah@example.com', totalOrders: 1, totalSpent: 1100, joinedDate: '2026-05-01' }
];

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Local Mock State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [customers] = useState(INITIAL_CUSTOMERS);

  // Backend Posts State
  const [backendPosts, setBackendPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState('');

  // Form states for adding/editing a post
  const [showPostModal, setShowPostModal] = useState(false);
  const [postModalMode, setPostModalMode] = useState('add'); // 'add' or 'edit'
  const [currentPostId, setCurrentPostId] = useState(null);
  const [postFormName, setPostFormName] = useState('');
  const [postFormDescription, setPostFormDescription] = useState('');
  const [postFormCategory, setPostFormCategory] = useState('men');

  const fetchBackendPosts = async () => {
    setPostsLoading(true);
    setPostsError('');
    try {
      const response = await getPosts();
      if (response.success) {
        setBackendPosts(response.data || []);
      }
    } catch (err) {
      console.error(err);
      setPostsError(err.message || 'Failed to fetch posts');
    } finally {
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'posts') {
      fetchBackendPosts();
    }
  }, [activeTab]);

  const handleOpenAddPost = () => {
    setPostModalMode('add');
    setCurrentPostId(null);
    setPostFormName('');
    setPostFormDescription('');
    setPostFormCategory('men');
    setShowPostModal(true);
  };

  const handleOpenEditPost = (post) => {
    setPostModalMode('edit');
    setCurrentPostId(post._id);
    setPostFormName(post.name);
    setPostFormDescription(post.description);
    setPostFormCategory(post.category || 'men');
    setShowPostModal(true);
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    const postData = { name: postFormName, description: postFormDescription, category: postFormCategory };

    try {
      if (postModalMode === 'add') {
        const response = await createPost(postData);
        if (response.success) {
          alert('Product created successfully!');
          fetchBackendPosts();
        }
      } else {
        const response = await updatePost(currentPostId, postData);
        if (response.success) {
          alert('Product updated successfully!');
          fetchBackendPosts();
        }
      }
      setShowPostModal(false);
    } catch (err) {
      alert(err.message || 'Failed to save product');
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await deletePost(id);
        if (response.success) {
          alert('Product deleted successfully!');
          fetchBackendPosts();
        }
      } catch (err) {
        alert(err.message || 'Failed to delete product');
      }
    }
  };

  // Filters
  const [orderFilterEmail, setOrderFilterEmail] = useState('');

  // Product Add/Edit Form Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentProductId, setCurrentProductId] = useState(null);

  // Form Field States
  const [formName, setFormName] = useState('');
  const [formDesigner, setFormDesigner] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formStock, setFormStock] = useState('');
  const [formCategory, setFormCategory] = useState('men');

  // Stats Calculations
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;
  const totalCustomersCount = customers.length;

  const handleLogout = () => {
    console.log('Logout clicked');
    // TODO: clear auth token and redirect
    localStorage.removeItem('isAdmin');
    navigate('/admin-login');
  };

  // Delete product action
  const handleDeleteProduct = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Open modal for editing product
  const handleOpenEditProduct = (product) => {
    setModalMode('edit');
    setCurrentProductId(product.id);
    setFormName(product.name);
    setFormDesigner(product.designer);
    setFormPrice(product.price.toString());
    setFormStock(product.stock.toString());
    setFormCategory(product.category);
    setShowProductModal(true);
  };

  // Open modal for adding product
  const handleOpenAddProduct = () => {
    setModalMode('add');
    setCurrentProductId(null);
    setFormName('');
    setFormDesigner('');
    setFormPrice('');
    setFormStock('50');
    setFormCategory('men');
    setShowProductModal(true);
  };

  // Save product details
  const handleSaveProduct = (e) => {
    e.preventDefault();
    const price = parseFloat(formPrice) || 0;
    const stock = parseInt(formStock) || 0;

    if (modalMode === 'add') {
      // TODO: call POST /api/products
      const newProduct = {
        id: `p-${Date.now()}`,
        name: formName || `${formDesigner} - New Style`,
        designer: formDesigner,
        title: formName.split(' - ')[1] || 'New Style',
        price,
        stock,
        category: formCategory,
        image: m_p1 // default placeholder image for mock adding
      };
      setProducts((prev) => [newProduct, ...prev]);
    } else {
      // TODO: call PUT /api/products/:id
      setProducts((prev) =>
        prev.map((p) =>
          p.id === currentProductId
            ? {
                ...p,
                name: formName,
                designer: formDesigner,
                price,
                stock,
                category: formCategory
              }
            : p
        )
      );
    }
    setShowProductModal(false);
  };

  // Update order status dropdown selector
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    // TODO: call PATCH /api/orders/:id/status
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Navigate to customer orders filter
  const handleViewCustomerOrders = (customerEmail) => {
    setOrderFilterEmail(customerEmail);
    setActiveTab('orders');
  };

  // Filtered orders list based on email filter
  const filteredOrders = orderFilterEmail
    ? orders.filter((o) => o.email.toLowerCase() === orderFilterEmail.toLowerCase())
    : orders;

  const renderStatusBadge = (status) => {
    let badgeClass = styles.badgePending;
    if (status === 'Processing') badgeClass = styles.badgeProcessing;
    if (status === 'Shipped') badgeClass = styles.badgeShipped;
    if (status === 'Delivered') badgeClass = styles.badgeDelivered;
    if (status === 'Cancelled') badgeClass = styles.badgeCancelled;
    return <span className={`${styles.statusBadge} ${badgeClass}`}>{status}</span>;
  };

  return (
    <div className={styles.adminContainer}>
      {/* Admin header */}
      <header className={styles.adminHeader}>
        <h1 className={styles.headerTitle}>ELEONORA BONUCCI — ADMIN</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </header>

      {/* Tab bar */}
      <div className={styles.tabBar}>
        <button
          className={`${styles.tabButton} ${activeTab === 'dashboard' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'products' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'orders' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'customers' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('customers')}
        >
          Customers
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'posts' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Products (MongoDB)
        </button>
      </div>

      {/* Tab Contents */}
      <div className={styles.mainContent}>
        {activeTab === 'dashboard' && (
          <div>
            {/* Stat Cards Row */}
            <div className={styles.cardsGrid}>
              <div className={styles.card}>
                <p className={styles.cardTitle}>Total Revenue</p>
                <h3 className={styles.cardValue}>€{totalRevenue.toLocaleString()}</h3>
              </div>
              <div className={styles.card}>
                <p className={styles.cardTitle}>Total Orders</p>
                <h3 className={styles.cardValue}>{totalOrdersCount}</h3>
              </div>
              <div className={styles.card}>
                <p className={styles.cardTitle}>Total Products</p>
                <h3 className={styles.cardValue}>{totalProductsCount}</h3>
              </div>
              <div className={styles.card}>
                <p className={styles.cardTitle}>Total Customers</p>
                <h3 className={styles.cardValue}>{totalCustomersCount}</h3>
              </div>
            </div>

            <h2 className={styles.sectionTitle}>Recent Orders (Last 5)</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Order ID</th>
                    <th className={styles.th}>Customer</th>
                    <th className={styles.th}>Items</th>
                    <th className={styles.th}>Total</th>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className={styles.trHover}>
                      <td className={styles.td}>{order.id}</td>
                      <td className={styles.td}>
                        <strong>{order.customerName}</strong>
                        <br />
                        <span style={{ fontSize: '11px', color: '#666' }}>{order.email}</span>
                      </td>
                      <td className={styles.td}>{order.items}</td>
                      <td className={styles.td}>€{order.total}</td>
                      <td className={styles.td}>{renderStatusBadge(order.status)}</td>
                      <td className={styles.td}>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className={styles.topActionsRow}>
              <h2 className={styles.sectionTitle}>Product Inventory</h2>
              <button onClick={handleOpenAddProduct} className={styles.addBtn}>
                Add Product
              </button>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>ID</th>
                    <th className={styles.th}>Image</th>
                    <th className={styles.th}>Name</th>
                    <th className={styles.th}>Designer</th>
                    <th className={styles.th}>Category</th>
                    <th className={styles.th}>Price</th>
                    <th className={styles.th}>Stock</th>
                    <th className={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className={styles.trHover}>
                      <td className={styles.td}>{product.id}</td>
                      <td className={styles.td}>
                        <img src={product.image} alt={product.name} className={styles.thumbnail} />
                      </td>
                      <td className={styles.td}><strong>{product.name}</strong></td>
                      <td className={styles.td}>{product.designer}</td>
                      <td className={styles.td} style={{ textTransform: 'capitalize' }}>
                        {product.category}
                      </td>
                      <td className={styles.td}>€{product.price}</td>
                      <td className={styles.td}>{product.stock}</td>
                      <td className={styles.td}>
                        <button onClick={() => handleOpenEditProduct(product)} className={styles.editBtn}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteProduct(product.id)} className={styles.deleteBtn}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <div className={styles.topActionsRow}>
              <h2 className={styles.sectionTitle}>Customer Orders</h2>
              {orderFilterEmail && (
                <div className={styles.filterHeader}>
                  <span>Showing orders for: <strong>{orderFilterEmail}</strong></span>
                  <button onClick={() => setOrderFilterEmail('')} className={styles.clearFilterBtn}>
                    Clear Filter
                  </button>
                </div>
              )}
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Order ID</th>
                    <th className={styles.th}>Customer Name</th>
                    <th className={styles.th}>Email</th>
                    <th className={styles.th}>Items</th>
                    <th className={styles.th}>Total</th>
                    <th className={styles.th}>Payment Method</th>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th}>Date</th>
                    <th className={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className={styles.trHover}>
                      <td className={styles.td}>{order.id}</td>
                      <td className={styles.td}><strong>{order.customerName}</strong></td>
                      <td className={styles.td}>{order.email}</td>
                      <td className={styles.td}>{order.items}</td>
                      <td className={styles.td}>€{order.total}</td>
                      <td className={styles.td}>{order.paymentMethod}</td>
                      <td className={styles.td}>{renderStatusBadge(order.status)}</td>
                      <td className={styles.td}>{order.date}</td>
                      <td className={styles.td}>
                        <select
                          className={styles.statusSelect}
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div>
            <h2 className={styles.sectionTitle}>Registered Customers</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Customer ID</th>
                    <th className={styles.th}>Name</th>
                    <th className={styles.th}>Email</th>
                    <th className={styles.th}>Total Orders</th>
                    <th className={styles.th}>Total Spent</th>
                    <th className={styles.th}>Joined Date</th>
                    <th className={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((cust) => (
                    <tr key={cust.id} className={styles.trHover}>
                      <td className={styles.td}>{cust.id}</td>
                      <td className={styles.td}><strong>{cust.name}</strong></td>
                      <td className={styles.td}>{cust.email}</td>
                      <td className={styles.td}>{cust.totalOrders}</td>
                      <td className={styles.td}>€{cust.totalSpent}</td>
                      <td className={styles.td}>{cust.joinedDate}</td>
                      <td className={styles.td}>
                        <button onClick={() => handleViewCustomerOrders(cust.email)} className={styles.viewBtn}>
                          View Orders
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div>
            <div className={styles.topActionsRow}>
              <h2 className={styles.sectionTitle}>Products</h2>
              <button onClick={handleOpenAddPost} className={styles.addBtn}>
                Add Product
              </button>
            </div>

            {postsLoading && <p style={{ padding: '20px 0', color: '#666' }}>Loading products from database...</p>}
            {postsError && <p style={{ padding: '20px 0', color: '#e056fd' }}>Error: {postsError}</p>}
            
            {!postsLoading && !postsError && backendPosts.length === 0 && (
              <p style={{ padding: '20px 0', color: '#666' }}>No products found. Click "Add Product" to create one in MongoDB!</p>
            )}

            {!postsLoading && backendPosts.length > 0 && (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.th}>ID</th>
                      <th className={styles.th}>Name</th>
                      <th className={styles.th}>Description</th>
                      <th className={styles.th}>Category</th>
                      <th className={styles.th}>Created At</th>
                      <th className={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backendPosts.map((post) => (
                      <tr key={post._id} className={styles.trHover}>
                        <td className={styles.td} style={{ fontSize: '11px', fontFamily: 'monospace', color: '#888' }}>
                          {post._id}
                        </td>
                        <td className={styles.td}><strong>{post.name}</strong></td>
                        <td className={styles.td}>{post.description}</td>
                        <td className={styles.td} style={{ textTransform: 'capitalize' }}>{post.category}</td>
                        <td className={styles.td}>
                          {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className={styles.td}>
                          <button onClick={() => handleOpenEditPost(post)} className={styles.editBtn}>
                            Edit
                          </button>
                          <button onClick={() => handleDeletePost(post._id)} className={styles.deleteBtn}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showProductModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>
              {modalMode === 'add' ? 'Add Product' : 'Edit Product'}
            </h3>
            
            <form onSubmit={handleSaveProduct}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Product Name *</label>
                <input
                  type="text"
                  required
                  className={styles.input}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Designer *</label>
                <input
                  type="text"
                  required
                  className={styles.input}
                  value={formDesigner}
                  onChange={(e) => setFormDesigner(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Category *</label>
                <select
                  className={styles.select}
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Price (EUR) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  className={styles.input}
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Stock *</label>
                <input
                  type="number"
                  required
                  min="0"
                  className={styles.input}
                  value={formStock}
                  onChange={(e) => setFormStock(e.target.value)}
                />
              </div>

              <div className={styles.formActions}>
                <button type="button" onClick={() => setShowProductModal(false)} className={styles.cancelBtn}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Add/Edit Product Modal */}
      {showPostModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>
              {postModalMode === 'add' ? 'Add Product (MongoDB)' : 'Edit Product (MongoDB)'}
            </h3>
            
            <form onSubmit={handleSavePost}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Name *</label>
                <input
                  type="text"
                  required
                  className={styles.input}
                  value={postFormName}
                  onChange={(e) => setPostFormName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Description *</label>
                <textarea
                  required
                  className={styles.input}
                  style={{ minHeight: '80px', fontFamily: 'inherit', padding: '10px', boxSizing: 'border-box' }}
                  value={postFormDescription}
                  onChange={(e) => setPostFormDescription(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Category *</label>
                <select
                  required
                  className={styles.select}
                  value={postFormCategory}
                  onChange={(e) => setPostFormCategory(e.target.value)}
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                </select>
              </div>

              <div className={styles.formActions}>
                <button type="button" onClick={() => setShowPostModal(false)} className={styles.cancelBtn}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
