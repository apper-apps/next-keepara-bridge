// Client service for managing client data through Apper backend
import { toast } from 'react-toastify';

// Delay utility for consistent UX
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Get all clients
export const getAll = async () => {
  try {
    await delay(300);
    
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "Tags" } },
        { field: { Name: "Owner" } },
        { field: { Name: "CreatedOn" } },
        { field: { Name: "CreatedBy" } },
        { field: { Name: "ModifiedOn" } },
        { field: { Name: "ModifiedBy" } }
      ],
      orderBy: [
        {
          fieldName: "CreatedOn",
          sorttype: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('client', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error('Error fetching clients:', error);
    toast.error('Failed to load clients');
    return [];
  }
};

// Get client by ID
export const getById = async (id) => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "Tags" } },
        { field: { Name: "Owner" } },
        { field: { Name: "CreatedOn" } },
        { field: { Name: "CreatedBy" } },
        { field: { Name: "ModifiedOn" } },
        { field: { Name: "ModifiedBy" } }
      ]
    };
    
    const response = await apperClient.getRecordById('client', id, params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return null;
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching client with ID ${id}:`, error);
    toast.error('Failed to load client details');
    return null;
  }
};

// Create new client
export const create = async (clientData) => {
  try {
    const apperClient = getApperClient();
    
    // Only include Updateable fields
    const params = {
      records: [{
        Name: clientData.Name || '',
        Tags: clientData.Tags || '',
        Owner: clientData.Owner || null
      }]
    };
    
    const response = await apperClient.createRecord('client', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return null;
    }
    
    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        
        failedRecords.forEach(record => {
          record.errors?.forEach(error => {
            toast.error(`${error.fieldLabel}: ${error.message}`);
          });
          if (record.message) toast.error(record.message);
        });
      }
      
      if (successfulRecords.length > 0) {
        toast.success('Client created successfully');
        return successfulRecords[0].data;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error creating client:', error);
    toast.error('Failed to create client');
    return null;
  }
};

// Update existing client
export const update = async (id, clientData) => {
  try {
    const apperClient = getApperClient();
    
    // Only include Updateable fields plus ID
    const params = {
      records: [{
        Id: parseInt(id),
        Name: clientData.Name || '',
        Tags: clientData.Tags || '',
        Owner: clientData.Owner || null
      }]
    };
    
    const response = await apperClient.updateRecord('client', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return null;
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        
        failedUpdates.forEach(record => {
          record.errors?.forEach(error => {
            toast.error(`${error.fieldLabel}: ${error.message}`);
          });
          if (record.message) toast.error(record.message);
        });
      }
      
      if (successfulUpdates.length > 0) {
        toast.success('Client updated successfully');
        return successfulUpdates[0].data;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error updating client:', error);
    toast.error('Failed to update client');
    return null;
  }
};

// Delete client
export const deleteClient = async (id) => {
  try {
    const apperClient = getApperClient();
    const params = {
      RecordIds: [parseInt(id)]
    };
    
    const response = await apperClient.deleteRecord('client', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return false;
    }
    
    if (response.results) {
      const successfulDeletions = response.results.filter(result => result.success);
      const failedDeletions = response.results.filter(result => !result.success);
      
      if (failedDeletions.length > 0) {
        console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
        
        failedDeletions.forEach(record => {
          if (record.message) toast.error(record.message);
        });
      }
      
      if (successfulDeletions.length > 0) {
        toast.success('Client deleted successfully');
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error deleting client:', error);
    toast.error('Failed to delete client');
    return false;
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  delete: deleteClient
};